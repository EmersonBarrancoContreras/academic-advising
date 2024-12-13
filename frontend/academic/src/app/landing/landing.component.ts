import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Benefit, Step, Testimonial } from '../models/landing.model';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { QuotesComponent } from '../shared/components/quotes/quotes.component';
import NavbarComponent from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    PanelModule,
    AvatarModule,
    ScrollPanelModule,
    QuotesComponent,
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export default class LandingComponent implements OnInit {
  items: { label?: string; icon?: string; separator?: boolean }[] = [];

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Refresh',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Search',
        icon: 'pi pi-search',
      },
      {
        separator: true,
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
    ];
  }
  benefits: Benefit[] = [
    {
      icon: 'pi pi-check-circle',
      title: 'Asesores Verificados',
      description:
        'Todos nuestros asesores pasan por un riguroso proceso de validación.',
    },
    {
      icon: 'pi pi-clock',
      title: 'Horarios Flexibles',
      description:
        'Encuentra asesorías que se ajusten a tu horario y necesidades.',
    },
    {
      icon: 'pi pi-shield',
      title: 'Garantía de Calidad',
      description:
        'Califica y revisa las sesiones para asegurar la mejor experiencia.',
    },
  ];

  steps: Step[] = [
    {
      icon: 'pi pi-user',
      title: 'Regístrate',
      description: 'Crea tu cuenta en minutos',
    },
    {
      icon: 'pi pi-search',
      title: 'Busca',
      description: 'Encuentra el asesor ideal',
    },
    {
      icon: 'pi pi-bookmark',
      title: 'Agenda',
      description: 'Reserva tu sesión',
    },
    {
      icon: 'pi pi-book',
      title: 'Aprende',
      description: 'Recibe tu asesoría online',
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Ana García',
      title: 'Estudiante de Ingeniería',
      image: 'assets/images/avatar1.jpg',
      quote:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      name: 'Carlos Ruiz',
      title: 'Asesor de Física',
      image: 'assets/images/avatar2.jpg',
      quote:
        'Como asesor, la plataforma me permite ayudar a estudiantes mientras genero ingresos extra de manera flexible.',
    },
    {
      name: 'Laura Méndez',
      title: 'Estudiante de Medicina',
      image: 'assets/images/avatar3.jpg',
      quote:
        'Las asesorías personalizadas me han ayudado mucho. El proceso de reserva es muy sencillo.',
    },
  ];
  navigateTo(path: string): void {
    void this.router.navigate([path]);
  }
}
