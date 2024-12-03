import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
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
        command: () => this.logout(),
      },
    ];
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  logout(): void {
    // Implementar lógica de cierre de sesión
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
