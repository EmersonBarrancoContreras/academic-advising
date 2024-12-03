import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '@services/theme.service';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export default class NavbarComponent {
  constructor(private themeService: ThemeService, private router: Router) {
    // Suscribirse a los cambios de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Puedes usar esta suscripción para realizar acciones cuando la ruta cambie
        this.checkActiveRoute(event.url);
      });
  }

  isDarkMode = () => this.themeService.isDarkMode();

  logoSrc = computed(() =>
    this.themeService.isDarkMode()
      ? '../../../../assets/images/logo-white.svg'
      : '../../../../assets/images/logo2.svg'
  );

  logoTextSrc = computed(() =>
    this.themeService.isDarkMode()
      ? '../../../../assets/images/Academic-Advising-white.svg'
      : '../../../../assets/images/Academic Advising.svg'
  );

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  checkActiveRoute(url: string) {
    // Puedes usar esto para realizar acciones basadas en la ruta actual
    console.log('Ruta actual:', url);
  }

  items: MenuItem[] = [
    {
      label: 'Inicio',
      routerLink: '/landing',
      icon: 'pi pi-home',
      routerLinkActiveOptions: { exact: true },
      command: () => {
        this.router.navigate(['/landing']);
      }
    },
    {
      label: 'Asesores',
      routerLink: '/advisors',
      icon: 'pi pi-user',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Materias',
      routerLink: '/subjects',
      icon: 'pi pi-book',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: '¿Cómo funciona?',
      routerLink: '/how-it-works',
      icon: 'pi pi-question-circle',
      routerLinkActiveOptions: { exact: true },
    },
    {
      label: 'Precios',
      routerLink: '/pricing',
      icon: 'pi pi-dollar',
      routerLinkActiveOptions: { exact: true },
    },
  ];
}
