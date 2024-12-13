import { Routes } from '@angular/router';
import { RoleGuard } from './shared/guards/role-guard.guard';

export const routes: Routes = [
  {
    path: 'landing',
    title: 'Inicio',
    loadComponent: () => import('./landing/landing.component'),
  },
  {
    path: 'advisors',
    title: 'Asesores',
    loadComponent: () => import('./components/advisors/advisors.component'),
  },
  {
    path: 'materias',
    title: 'Materias',
    loadComponent: () => import('./components/materias/materias.component'),
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Iniciar sesión',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () => import('./auth/register/register.component'),
      },
    ],
  },
  {
    path: 'dashboard-advisor',
    loadComponent: () =>
      import('./dashboard-advisor/dashboard-advisor.component'),
    canActivate: [RoleGuard],
    data: { rol: 'asesor' },
    children: [
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import('./dashboard-advisor/profile/profile.component'),
      },
      {
        path: '',
        redirectTo: 'advisor',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'dashboard-student',
    loadComponent: () =>
      import('./dashboard-student/dashboard-student.component'),
    canActivate: [RoleGuard],
    data: { rol: 'estudiante' },
    children: [
      //Portal estudiante
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import(
            './dashboard-student/portal-estudiante/profile/profile.component'
          ),
      },
      {
        path: 'academic-profile',
        title: 'Perfil academico',
        loadComponent: () =>
          import(
            './dashboard-student/portal-estudiante/academic-profile/academic-profile.component'
          ),
      },
      {
        path: 'academic-history',
        title: 'Historial Académico',
        loadComponent: () =>
          import(
            './dashboard-student/portal-estudiante/academic-history/academic-history.component'
          ),
      },
      //Búsqueda de asesorias
      {
        path: 'avalible-times',
        title: 'Horarios disponibles',
        loadComponent: () =>
          import(
            './dashboard-student/busqueda-asesorias/avalible-times/avalible-times.component'
          ),
      },
      {
        path: 'consultancy-catalog',
        title: 'Catálogo asesorías',
        loadComponent: () =>
          import(
            './dashboard-student/busqueda-asesorias/consultancy-catalog/consultancy-catalog.component'
          ),
      },
      {
        path: 'filters-by-subject-speciality',
        title: 'Filtros materia/especialidad',
        loadComponent: () =>
          import(
            './dashboard-student/busqueda-asesorias/filters-by-subject-specialty/filters-by-subject-specialty.component'
          ),
      },
      //Gestión de asesorías
      {
        path: 'advisory-history',
        title: 'Historial asesorías',
        loadComponent: () =>
          import(
            './dashboard-student/gestion-asesorias/advisory-history/advisory-history.component'
          ),
      },
      {
        path: 'evaluations',
        title: 'Evaluaciones',
        loadComponent: () =>
          import(
            './dashboard-student/gestion-asesorias/evaluations/evaluations.component'
          ),
      },
      {
        path: 'qualifications',
        title: 'Calificaciones',
        loadComponent: () =>
          import(
            './dashboard-student/gestion-asesorias/qualifications/qualifications.component'
          ),
      },
      {
        path: 'schedule-advice',
        title: 'Programar asesoría',
        loadComponent: () =>
          import(
            './dashboard-student/gestion-asesorias/schedule-advice/schedule-advice.component'
          ),
      },
      {
        path: 'schedule-consultancy',
        title: 'Asesorías programadas',
        loadComponent: () =>
          import(
            './dashboard-student/gestion-asesorias/scheduled-consultations/scheduled-consultations.component'
          ),
      },
      //PAGOS
      {
        path: 'buy-packages',
        title: 'Comprar paquetes',
        loadComponent: () =>
          import(
            './dashboard-student/pagos/buy-packages/buy-packages.component'
          ),
      },
      {
        path: 'statement',
        title: 'Estado de cuenta',
        loadComponent: () =>
          import('./dashboard-student/pagos/statement/statement.component'),
      },
      {
        path: 'payment-history',
        title: 'Historial de pagos',
        loadComponent: () =>
          import(
            './dashboard-student/pagos/payment-history/payment-history.component'
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard-student',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
];
