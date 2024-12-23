import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Services
import { AuthService, RegisterData } from '@services/auth.service';
import { InstitucionesService } from '@services/instituciones.service';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Institucion {
  id: number;
  nombre: string;
  sedes?: Sede[];
  carreras?: Carrera[];
}

interface Sede {
  id: number;
  nombre: string;
}

interface Carrera {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CalendarModule,
    InputMaskModule,
    DropdownModule,
    DividerModule,
    CheckboxModule,
    ToastModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  instituciones: any = [];
  sedesDisponibles: Sede[] = [];
  carrerasDisponibles: Carrera[] = [];
  institucionesDisponibles: Institucion[] = [];

  nivel = [
    { name: 'Primaria', value: 'primaria' },
    { name: 'Bachiller', value: 'bachiller' },
    { name: 'Universitario', value: 'universitario' },
    { name: 'Profesional', value: 'profesional' },
  ];

  semestres = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}° Semestre`,
    value: i + 1,
  }));

  grados = Array.from({ length: 11 }, (_, i) => ({
    label: `${i + 1}° Grado`,
    value: i + 1,
  }));

  constructor(
    private authService: AuthService,
    private institucionesService: InstitucionesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.initForm();
    this.setupFormSubscriptions();
  }

  private initForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      nivel: ['', Validators.required],
      institucion: [null, Validators.required],
      sede: [null],
      carrera: [null],
      grado: [null],
      semestre: [null],
      terms: [false, Validators.requiredTrue],
    });
  }

  private setupFormSubscriptions(): void {
    this.registrationForm.get('nivel')?.valueChanges.subscribe((nivel) => {
      this.onNivelChange(nivel);
    });

    this.registrationForm
      .get('institucion')
      ?.valueChanges.subscribe((institucion) => {
        if (institucion) {
          this.onInstitucionChange(institucion);
        }
      });
  }

  async ngOnInit(): Promise<void> {
    console.log('Form controls:', Object.keys(this.registrationForm.controls));
    try {
      const data = await firstValueFrom(
        this.institucionesService.obtenerInstituciones()
      );
      this.instituciones = data;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudieron cargar las instituciones',
      });
      console.error('Error al cargar instituciones:', error);
    }
  }

  onNivelChange(nivel: string): void {
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

    // Reset dependant fields
    this.registrationForm.patchValue({
      institucion: null,
      sede: null,
      carrera: null,
      grado: null,
      semestre: null,
    });

    this.registrationForm.get('carrera')?.updateValueAndValidity();
  }

  onInstitucionChange(institucion: Institucion): void {
    if (institucion) {
      if (
        ['universitario', 'profesional'].includes(
          this.registrationForm.get('nivel')?.value
        )
      ) {
        this.sedesDisponibles = institucion.sedes || [];
        this.carrerasDisponibles = institucion.carreras || [];
      } else {
        this.sedesDisponibles = [];
        this.carrerasDisponibles = [];
      }
    }
  }

  signInWithGoogle(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Google Sign In',
      detail: 'Iniciando sesión con Google...',
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos',
      });
      return;
    }

    const formData = this.registrationForm.value;

    // Transformación corregida de datos
    const userData: RegisterData = {
      email: formData.email,
      password: formData.password,
      nombre: formData.firstName,
      apellido: formData.lastName,
      rol: 'estudiante', // Agregamos el rol que faltaba
      nivelAcademico: formData.nivel,
      gradoActual: ['primaria', 'bachiller'].includes(formData.nivel)
        ? formData.grado
        : null,
      semestreActual:
        formData.nivel === 'universitario' ? formData.semestre : null,
      idCarrera:
        formData.nivel === 'universitario' ? formData.carrera?.id : null,
      idColegio: ['primaria', 'bachiller'].includes(formData.nivel)
        ? formData.institucion?.id
        : null,
      idSede: formData.sede?.id || null,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario registrado correctamente',
        });
        setTimeout(() => {
          this.router.navigate(['./auth/login']);
        }, 1000);
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || 'Error al registrar usuario',
        });
      },
    });
  }
}
