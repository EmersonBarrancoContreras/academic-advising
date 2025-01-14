import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
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
      transition(
        'visible => hidden',
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'hidden => visible',
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<boolean>();
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
    this.menuToggle.emit(this.menuVisible);
  }

  get buttonStyle() {
    return {
      left: this.menuVisible ? '260px' : '0px',
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
          label: '¡Bienvenido a tu portal academico!',
          disabled: true,
        },
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: [`/dashboard-${this.dashboardType}/home`],
        },
        {
          label: 'Portal Estudiante',
          icon: 'pi pi-tablet',
          routerLink: [`/dashboard-${this.dashboardType}/portal-student`],
        },
        {
          label: 'Búsqueda asesorías',
          icon: 'pi pi-search',
          routerLink: [`/dashboard-${this.dashboardType}/busqueda-asesorias`],
        },
        {
          label: 'Gestión asesorías',
          icon: 'pi pi-chart-bar',
          routerLink: [`/dashboard-${this.dashboardType}/gestion-asesorias`],
        },
        {
          label: 'Pagos',
          icon: 'pi pi-dollar',
          routerLink: [`/dashboard-${this.dashboardType}/pagos`],
        },
      ];
    } else {
      this.menuItems = [
        {
          label: 'Portal Advisor',
          icon: 'pi pi-users',
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
    return '';
  }
}
