import { AuthService, RegisterData } from '@services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InstitucionesService } from '@services/instituciones.service';
import { Router } from '@angular/router';

// Importaciones PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    CheckboxModule,
    DividerModule,
    CardModule,
    PasswordModule,
    InputMaskModule,
    ToastModule,
    DropdownModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  registrationForm: FormGroup;
  instituciones: any = [];
  sedesDisponibles: any = [];
  carrerasDisponibles: any = [];
  institucionesDisponibles: any = [];

  semestres = [
    { label: '1er Semestre', value: 1 },
    { label: '2do Semestre', value: 2 },
    { label: '3er Semestre', value: 3 },
    { label: '4to Semestre', value: 4 },
    { label: '5to Semestre', value: 5 },
    { label: '6to Semestre', value: 6 },
    { label: '7mo Semestre', value: 7 },
    { label: '8vo Semestre', value: 8 },
    { label: '9no Semestre', value: 9 },
    { label: '10mo Semestre', value: 10 },
  ];

  grados = [
    { label: '1° Grado', value: 1 },
    { label: '2° Grado', value: 2 },
    { label: '3° Grado', value: 3 },
    { label: '4° Grado', value: 4 },
    { label: '5° Grado', value: 5 },
    { label: '6° Grado', value: 6 },
    { label: '7° Grado', value: 7 },
    { label: '8° Grado', value: 8 },
    { label: '9° Grado', value: 9 },
    { label: '10° Grado', value: 10 },
    { label: '11° Grado', value: 11 },
  ];

  nivel = [
    { name: 'Primaria', value: 'primaria' },
    { name: 'Bachiller', value: 'bachiller' },
    { name: 'Universitario', value: 'universitario' },
    { name: 'Profesional', value: 'profesional' },
  ];
  ApiService: any;

  constructor(
    private AuthService: AuthService,
    private institucionesService: InstitucionesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      nivel: ['', Validators.required],
      grado: [null],
      semestre: [null],
      institucion: [null, Validators.required],
      sede: [null, Validators.required],
      terms: [false, Validators.requiredTrue],
    });

    // Suscribirse a cambios en el nivel
    this.registrationForm.get('nivel')?.valueChanges.subscribe((nivel) => {
      this.onNivelChange(nivel);
      // Resetear los campos dependientes
      this.registrationForm.patchValue({
        institucion: null,
        sede: null,
        carrera: null,
      });
    });

    // Suscribirse a cambios en la institución
    this.registrationForm
      .get('institucion')
      ?.valueChanges.subscribe((institucion) => {
        if (institucion) {
          this.onInstitucionChange(institucion);
        } else {
          this.sedesDisponibles = [];
          this.carrerasDisponibles = [];
        }
      });
  }

  async ngOnInit() {
    try {
      const data = await firstValueFrom(
        this.institucionesService.obtenerInstituciones()
      );
      this.instituciones = data;
    } catch (error) {
      console.error('Error al cargar instituciones:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar las instituciones',
      });
    }
  }

  onNivelChange(nivel: string) {
    console.log('Nivel seleccionado:', nivel);
    switch (nivel) {
      case 'primaria':
      case 'bachiller':
        this.institucionesDisponibles = this.instituciones.colegios || [];
        this.registrationForm.get('carrera')?.clearValidators();
        break;
      case 'universitario':
      case 'profesional':
        this.institucionesDisponibles = this.instituciones.universidades || [];
        this.registrationForm
          .get('carrera')
          ?.setValidators([Validators.required]);
        break;
      default:
        this.institucionesDisponibles = [];
    }
    this.registrationForm.get('carrera')?.updateValueAndValidity();
  }

  onInstitucionChange(institucion: any) {
    if (institucion) {
      if (
        this.registrationForm.get('nivel')?.value === 'universitario' ||
        this.registrationForm.get('nivel')?.value === 'profesional'
      ) {
        this.sedesDisponibles = institucion.sedes || [];
        this.carrerasDisponibles = institucion.carreras || [];
      } else {
        this.sedesDisponibles = [];
        this.carrerasDisponibles = [];
      }
    }
  }

  registerUser(userData: any) {
    this.AuthService.register(userData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario registrado correctamente',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al registrar usuario',
        });
        console.error('Error al registrar usuario', error);
      },
    });
  }

  signInWithGoogle() {
    this.messageService.add({
      severity: 'info',
      summary: 'Google Sign In',
      detail: 'Iniciando sesión con Google...',
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      const userData: RegisterData = {
        email: formData.email,
        password: formData.password,
        nombre: formData.firstName,
        apellido: formData.lastName,
        nivelAcademico: formData.nivel,
        gradoActual: ['primaria', 'secundaria'].includes(formData.nivel)
          ? formData.grado
          : null,
        semestreActual:
          formData.nivel === 'universitario' ? formData.semestre : null,
        idCarrera:
          formData.nivel === 'universitario' ? formData.institucion?.id : null,
        idColegio: ['primaria', 'secundaria'].includes(formData.nivel)
          ? formData.institucion?.id
          : null,
        idSede: formData.sede?.id,
      };

      this.AuthService.register(userData).subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Usuario registrado correctamente',
          });
          setTimeout(() => {
            this.router.navigate(['./auth/login']);
          }, 1000);
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || 'Error al registrar usuario',
          });
        },
      });
    }
  }
}
