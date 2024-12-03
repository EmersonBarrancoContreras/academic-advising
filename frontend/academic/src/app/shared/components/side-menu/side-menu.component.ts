import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { routes } from '../../../app.routes';
import { Route, Router, RouterModule } from '@angular/router';

interface MenuGroup {
  title: string;
  icon: string;
  items: Route[];
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    AvatarModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    RouterModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  public menuItems: Route[] = [];
  public menuGroups: MenuGroup[] = [];
  dashboardType: string;

  constructor(private router: Router) {
    this.dashboardType = router.url.includes('student') ? 'student' : 'advisor';
  }

  ngOnInit() {
    const currentPath = this.router.url;
    const dashboardType = currentPath.includes('student')
      ? 'student'
      : 'advisor';
    this.initializeMenu(dashboardType);
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
  sidebarVisible: boolean = false;

  private initializeMenu(dashboardType: 'student' | 'advisor') {
    // Obtén todas las rutas primero
    const allRoutes =
      routes
        .find((route) => route.path === `dashboard-${dashboardType}`)
        ?.children?.filter(
          (route) =>
            route.path && !route.path.includes(':') && route.path !== ''
        ) || [];

    // Agrupa las rutas según tu necesidad
    // Define los grupos según el tipo de dashboard
    if (dashboardType === 'student') {
      this.menuGroups = [
        {
          title: 'Portal Estudiante',
          icon: 'pi pi-tablet',
          items: allRoutes.filter((route) =>
            ['profile', 'academic-profile', 'academic-history'].includes(
              route.path || ''
            )
          ),
        },
        {
          title: 'Búsqueda asesrías',
          icon: 'pi pi-search',
          items: allRoutes.filter((route) =>
            [
              'avalible-times',
              'consultancy-catalog',
              'filters-by-subject-speciality',
            ].includes(route.path || '')
          ),
        },
        {
          title: 'Gestión asesorías',
          icon: 'pi pi-chart-bar',
          items: allRoutes.filter((route) =>
            [
              'advisory-history',
              'evaluations',
              'qualifications',
              'schedule-advice',
              'schedule-consultancy',
            ].includes(route.path || '')
          ),
        },
        {
          title: 'Pagos',
          icon: 'pi pi-dollar',
          items: allRoutes.filter((route) =>
            ['buy-packages', 'statement', 'payment-history'].includes(
              route.path || ''
            )
          ),
        },
        // Puedes agregar más grupos para estudiantes
      ];
    } else {
      // Grupos para advisor
      this.menuGroups = [
        {
          title: 'Portal Advisor',
          icon: 'pi pi-users',
          items: allRoutes.filter((route) =>
            ['profile', 'student'].includes(route.path || '')
          ),
        },
        // Puedes agregar más grupos para advisors
      ];
    }
  }

  getIconPath(path: string | undefined): string {
    const safePath = path ?? '';
    switch (safePath) {
      case 'profile':
        return 'pi pi-user';
      case 'student':
        return 'pi pi-user-plus';
      case 'academic-profile':
        return 'pi pi-graduation-cap';
      case 'academic-history':
        return 'pi pi-history';
      case 'avalible-times':
        return 'pi pi-calendar';
      case 'consultancy-catalog':
        return 'pi pi-book';
      case 'filters-by-subject-speciality':
        return 'pi pi-filter';
      case 'advisory-history':
        return 'pi pi-history';
      case 'evaluations':
        return 'pi pi-check';
      case 'qualifications':
        return 'pi pi-star';
      case 'schedule-advice':
        return 'pi pi-calendar-plus';
      case 'schedule-consultancy':
        return 'pi pi-calendar';
      case 'buy-packages':
        return 'pi pi-shopping-cart';
      case 'statement':
        return 'pi pi-file';
      case 'payment-history':
        return 'pi pi-history';
      default:
        return '';
    }
  }
}
