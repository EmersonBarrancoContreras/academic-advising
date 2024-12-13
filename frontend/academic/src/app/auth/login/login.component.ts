import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Services e interfaces
import { AuthService, LoginData, LoginResponse } from '@services/auth.service';
import { QuotesComponent } from '@shared/components/quotes/quotes.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    QuotesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar usuario autenticado
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        const dashboardRoute = this.authService.getDashboardRouteByRole(
          currentUser.rol
        );
        void this.router.navigate([dashboardRoute]);
        return;
      }

      // Cargar email guardado si existe
      const savedEmail = this.authService.getStoredEmail();
      if (savedEmail) {
        this.loginForm.patchValue({
          email: savedEmail,
          rememberMe: true,
        });
      }
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);

      try {
        const formValues = this.loginForm.value;
        const loginData: LoginData = {
          email: formValues.email ?? '',
          password: formValues.password ?? '',
        };

        const response = await firstValueFrom(
          this.authService.login(loginData)
        );

        if (isPlatformBrowser(this.platformId)) {
          if (formValues.rememberMe) {
            this.authService.setStoredEmail(loginData.email);
          } else {
            this.authService.removeStoredEmail();
          }
        }

        this.messageService.add({
          severity: 'success',
          summary: '¡Bienvenido!',
          detail: 'Has iniciado sesión correctamente',
        });

        const dashboardRoute = this.authService.getDashboardRouteByRole(
          response.user.rol
        );

        await this.router.navigate([dashboardRoute]);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Credenciales inválidas. Por favor, verifica tus datos.',
        });
      } finally {
        this.isLoading.set(false);
      }
    }
  }

  async signInWithGoogle() {
    this.isLoading.set(true);

    try {
      const response = await firstValueFrom(this.authService.googleLogin());

      this.messageService.add({
        severity: 'success',
        summary: '¡Bienvenido!',
        detail: 'Has iniciado sesión con Google correctamente',
      });

      const dashboardRoute = this.authService.getDashboardRouteByRole(
        response.user.rol
      );
      void this.router.navigate([dashboardRoute]);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo iniciar sesión con Google',
      });
    } finally {
      this.isLoading.set(false);
    }
  }
  navigateTo(path: string): void {
    void this.router.navigate([path]);
  }
}
