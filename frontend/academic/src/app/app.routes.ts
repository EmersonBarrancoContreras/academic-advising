import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role-guard.guard';

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
    loadComponent: () => import('./features/auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Iniciar sesión',
        loadComponent: () => import('./features/auth/login/login.component'),
      },
      {
        path: 'register',
        title: 'Registrarse',
        loadComponent: () =>
          import('./features/auth/register/register.component'),
      },
    ],
  },
  {
    path: 'dashboard-advisor',
    loadComponent: () =>
      import('./features/dashboard-advisor/dashboard-advisor.component'),
    canActivate: [RoleGuard],
    data: { rol: 'asesor' },
    children: [
      {
        path: 'profile',
        title: 'Perfil',
        loadComponent: () =>
          import('./features/dashboard-advisor/profile/profile.component'),
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
      import('./features/dashboard-student/dashboard-student.component'),
    canActivate: [RoleGuard],
    data: { rol: 'estudiante' },
    children: [
      {
        path: 'home',
        title: 'Inicio',
        loadComponent: () =>
          import('./features/dashboard-student/home/home.component'),
      },
      {
        path: 'portal-student',
        title: 'Portal estudiantil',
        loadComponent: () =>
          import('./features/dashboard-student/portal-student/portal-student.component'),
      },
      {
        path: 'busqueda-asesorias',
        title: 'Busqueda asesorias',
        loadComponent: () =>
          import('./features/dashboard-student/busqueda-asesorias/busqueda-asesorias.component'),
      },
      {
        path: 'gestion-asesorias',
        title: 'Gestion asesorias',
        loadComponent: () =>
          import('./features/dashboard-student/gestion-asesorias/gestion-asesorias.component'),
      },
      {
        path: 'pagos',
        title: 'Pagos',
        loadComponent: () =>
          import('./features/dashboard-student/pagos/pagos.component'),
      },
      {
        path: '',
        redirectTo: 'inicio',
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
