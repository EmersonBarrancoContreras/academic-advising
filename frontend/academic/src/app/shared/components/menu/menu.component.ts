import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { routes } from '../../../app.routes';
import { StyleClassModule } from 'primeng/styleclass';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    StyleClassModule,
    ScrollPanelModule,
  ],
  animations: [
    trigger('menuAnimation', [
      state('visible', style({ transform: 'translateX(0)', opacity: 1 })),
      state('hidden', style({ transform: 'translateX(-100%)', opacity: 0 })),
      transition('visible => hidden', animate('400ms ease-in')),
      transition('hidden => visible', animate('400ms ease-out')),
    ]),
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuVisible = true;
  dashboardType: string;
  constructor(private router: Router) {
    this.dashboardType = router.url.includes('student') ? 'student' : 'advisor';
  }

  ngOnInit() {
    this.initializeMenu();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  get buttonStyle() {
    return {
      left: this.menuVisible ? '250px' : '0px',
    };
  }

  menuItems: MenuItem[] = [];

  private initializeMenu() {
    const allRoutes =
      routes
        .find((route) => route.path === `dashboard-${this.dashboardType}`)
        ?.children?.filter(
          (route) =>
            route.path && !route.path.includes(':') && route.path !== ''
        ) || [];

    if (this.dashboardType === 'student') {
      this.menuItems = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          items: this.getMenuItems(allRoutes, ['inicio']),
        },
        {
          label: 'Portal Estudiante',
          icon: 'pi pi-tablet',
          items: this.getMenuItems(allRoutes, [
            'profile',
            'academic-profile',
            'academic-history',
          ]),
        },
        {
          label: 'Búsqueda asesorías',
          icon: 'pi pi-search',
          items: this.getMenuItems(allRoutes, [
            'avalible-times',
            'consultancy-catalog',
            'filters-by-subject-speciality',
          ]),
        },
        {
          label: 'Gestión asesorías',
          icon: 'pi pi-chart-bar',
          items: this.getMenuItems(allRoutes, [
            'advisory-history',
            'evaluations',
            'qualifications',
            'schedule-advice',
            'schedule-consultancy',
          ]),
        },
        {
          label: 'Pagos',
          icon: 'pi pi-dollar',
          items: this.getMenuItems(allRoutes, [
            'buy-packages',
            'statement',
            'payment-history',
          ]),
        },
      ];
    } else {
      this.menuItems = [
        {
          label: 'Portal Advisor',
          icon: 'pi pi-users',
          items: this.getMenuItems(allRoutes, ['profile', 'student']),
        },
      ];
    }
  }

  private getMenuItems(routes: any[], paths: string[]): MenuItem[] {
    return routes
      .filter((route) => paths.includes(route.path))
      .map((route) => ({
        label: this.formatLabel(route.path),
        icon: this.getIconPath(route.path),
        routerLink: [`/dashboard-${this.dashboardType}/${route.path}`],
      }));
  }

  private formatLabel(path: string): string {
    return path
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getIconPath(path: string): string {
    const icons: Record<string, string> = {
      profile: 'pi pi-user',
      student: 'pi pi-user-plus',
      inicio: 'pi pi-home',
      'academic-profile': 'pi pi-graduation-cap',
      'academic-history': 'pi pi-history',
      'avalible-times': 'pi pi-calendar',
      'consultancy-catalog': 'pi pi-book',
      'filters-by-subject-speciality': 'pi pi-filter',
      'advisory-history': 'pi pi-history',
      evaluations: 'pi pi-check',
      qualifications: 'pi pi-star',
      'schedule-advice': 'pi pi-calendar-plus',
      'schedule-consultancy': 'pi pi-calendar',
      'buy-packages': 'pi pi-shopping-cart',
      statement: 'pi pi-file',
      'payment-history': 'pi pi-history',
    };
    return icons[path] || '';
  }
}
