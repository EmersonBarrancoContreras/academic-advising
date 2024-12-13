import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this.goToSettings(),
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => this.onLogout(),
      },
    ];
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  onLogout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Sesión Cerrada',
      detail: 'Has cerrado sesión correctamente',
    });
  }

  ngOnInit(): void {}
}
