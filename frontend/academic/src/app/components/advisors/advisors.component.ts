import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asesor } from './interfaces/asesor.interface';
import {
  asesoresData,
  asesoresDestacadosData,
  filterOptions,
} from './data-ejemplo/asesores.data';

// PrimeNG imports
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import NavbarComponent from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-asesores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    AvatarModule,
    RatingModule,
    TagModule,
    ProgressSpinnerModule,
    NavbarComponent,
    RouterModule,
  ],
  templateUrl: './advisors.component.html',
  styleUrls: ['./advisors.component.scss'],
})
export default class AsesoresComponent implements OnInit {
  constructor(private Router: Router) {}

  // Signals
  searchTerm = signal('');
  selectedArea = signal<any>(null);
  selectedPrice = signal<any>(null);
  selectedAvailability = signal<any>(null);
  loading = signal(false);
  page = signal(1);

  // Data signals
  asesoresDestacados = signal<Asesor[]>(asesoresDestacadosData);
  asesores = signal<Asesor[]>(asesoresData);
  favoritos = signal<Asesor[]>([]);

  // Filter options
  areas = filterOptions.areas;
  rangosPrecios = filterOptions.rangosPrecios;
  disponibilidades = filterOptions.disponibilidades;

  // Computed values
  filteredAsesores = computed(() => {
    let result = this.asesores();
    const searchTerm = this.searchTerm().toLowerCase();
    const area = this.selectedArea()?.code;
    const price = this.selectedPrice()?.code;
    const availability = this.selectedAvailability()?.code;

    if (searchTerm) {
      result = result.filter(
        (asesor) =>
          asesor.nombre.toLowerCase().includes(searchTerm) ||
          asesor.especialidad.toLowerCase().includes(searchTerm)
      );
    }

    if (area) {
      result = result.filter((asesor) =>
        asesor.especialidad.toLowerCase().includes(area.toLowerCase())
      );
    }

    if (price) {
      const [min, max] = price.split('-').map(Number);
      result = result.filter((asesor) => {
        if (max) {
          return asesor.precio >= min && asesor.precio <= max;
        } else {
          return asesor.precio >= min;
        }
      });
    }

    if (availability) {
      result = result.filter((asesor) =>
        asesor.disponibilidad.toLowerCase().includes(availability.toLowerCase())
      );
    }

    return result;
  });

  ngOnInit() {
    // this.setupInfiniteScroll();
  }

  // setupInfiniteScroll() {
  //   window.addEventListener('scroll', () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //         document.documentElement.scrollHeight - 100 &&
  //       !this.loading()
  //     ) {
  //       this.loadMoreAdvisors();
  //     }
  //   });
  // }

  loadMoreAdvisors() {
    this.loading.set(true);
    setTimeout(() => {
      // Simular carga de más asesores
      this.page.update((p) => p + 1);
      this.loading.set(false);
    }, 1000);
  }

  // Update methods for signals
  updateSearchTerm(value: string) {
    this.searchTerm.set(value);
  }

  updateSelectedArea(value: any) {
    this.selectedArea.set(value);
  }

  updateSelectedPrice(value: any) {
    this.selectedPrice.set(value);
  }

  updateSelectedAvailability(value: any) {
    this.selectedAvailability.set(value);
  }

  onTabChange(event: number) {
    // Reset filters when changing tabs
    this.searchTerm.set('');
    this.selectedArea.set(null);
    this.selectedPrice.set(null);
    this.selectedAvailability.set(null);
  }
}
