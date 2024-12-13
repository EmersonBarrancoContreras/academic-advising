import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import NavbarComponent from '../../shared/components/navbar/navbar.component';

interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  profesor: string;
  departamento: string;
  creditos: number;
  calificacion: number;
  cupoTotal: number;
  cupoDisponible: number;
  modalidad: string;
  horario: string;
  descripcion: string;
  tasaAprobacion: number;
  recursos: string[];
  prerequisitos: string[];
  institucionId: number;
  nivel?: string;
}

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    TabViewModule,
    TagModule,
    RatingModule,
    AvatarModule,
    ChipModule,
    DialogModule,
    TooltipModule,
    ProgressBarModule,
    DividerModule,
    AccordionModule,
    NavbarComponent,
  ],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss'],
})
export default class MateriasComponent implements OnInit {
  searchTerm = signal('');
  selectedInstitution = signal<any>(null);
  selectedLevel = signal<any>(null);
  selectedModality = signal<any>(null);
  selectedPeriod = signal<any>(null);
  selectedCredits = signal<any>(null);
  selectedSchedule = signal<any>(null);
  showDetailModal = signal(false);
  selectedMateria = signal<Materia | null>(null);

  materias: Materia[] = [
    {
      id: 1,
      codigo: 'MAT-101',
      nombre: 'Cálculo Diferencial',
      profesor: 'Dr. Juan Pérez',
      departamento: 'Matemáticas',
      creditos: 8,
      calificacion: 4.8,
      cupoTotal: 30,
      cupoDisponible: 25,
      modalidad: 'Presencial',
      horario: 'Lun y Mie 10:00-12:00',
      descripcion: 'Fundamentos del cálculo diferencial y sus aplicaciones.',
      tasaAprobacion: 85,
      recursos: ['Libro de texto', 'Videos', 'Ejercicios'],
      prerequisitos: ['Álgebra', 'Geometría Analítica'],
      institucionId: 1,
    },
    {
      id: 2,
      codigo: 'FIS-201',
      nombre: 'Física Moderna',
      profesor: 'Dra. María González',
      departamento: 'Física',
      creditos: 6,
      calificacion: 4.6,
      cupoTotal: 25,
      cupoDisponible: 15,
      modalidad: 'Híbrido',
      horario: 'Mar y Jue 12:00-14:00',
      descripcion: 'Introducción a la física moderna y mecánica cuántica.',
      tasaAprobacion: 78,
      recursos: ['Presentaciones', 'Laboratorio Virtual', 'Guías'],
      prerequisitos: ['Física Básica', 'Cálculo'],
      institucionId: 1,
    },
    {
      id: 3,
      codigo: 'PROG-301',
      nombre: 'Programación Avanzada',
      profesor: 'Mtro. Carlos Ruiz',
      departamento: 'Computación',
      creditos: 7,
      calificacion: 4.9,
      cupoTotal: 35,
      cupoDisponible: 20,
      modalidad: 'En línea',
      horario: 'Mie y Vie 16:00-18:00',
      descripcion: 'Técnicas avanzadas de programación y estructuras de datos.',
      tasaAprobacion: 90,
      recursos: ['Repositorio Git', 'Documentación', 'Proyectos'],
      prerequisitos: ['Programación Básica'],
      institucionId: 2,
    },
  ];

  constructor() {
    this.materiasFiltradas.set(this.materias);
  }

  ngOnInit() {}
  // Signals

  // Datos de ejemplo
  instituciones = [
    { id: 1, name: 'UNAM' },
    { id: 2, name: 'IPN' },
    { id: 3, name: 'ITESM' },
  ];

  nivelesAcademicos = [
    { id: 1, name: 'Preparatoria' },
    { id: 2, name: 'Licenciatura' },
    { id: 3, name: 'Posgrado' },
  ];

  modalidades = [
    { id: 1, name: 'Presencial' },
    { id: 2, name: 'En línea' },
    { id: 3, name: 'Híbrido' },
  ];

  periodos = [
    { id: 1, name: 'Semestral' },
    { id: 2, name: 'Trimestral' },
    { id: 3, name: 'Intensivo' },
  ];

  // ... más datos de ejemplo

  materiasFiltradas = signal<Materia[]>([
    // Datos de ejemplo de materias
  ]);

  updateSelectedInstitution(institution: any) {
    this.selectedInstitution.set(institution);
    this.filterMaterias();
  }

  updateSelectedLevel(level: any) {
    this.selectedLevel.set(level);
    this.filterMaterias();
  }

  updateSelectedModality(modality: any) {
    this.selectedModality.set(modality);
    this.filterMaterias();
  }

  updateSelectedPeriod(period: any) {
    this.selectedPeriod.set(period);
    this.filterMaterias();
  }

  updateSelectedCredits(credits: any) {
    this.selectedCredits.set(credits);
    this.filterMaterias();
  }

  updateSelectedSchedule(schedule: any) {
    this.selectedSchedule.set(schedule);
    this.filterMaterias();
  }

  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
    this.filterMaterias();
  }

  filterMaterias() {
    // Aquí implementamos la lógica de filtrado basada en todos los criterios
    const filteredResults = this.materias.filter((materia) => {
      let matches = true;

      if (this.searchTerm()) {
        matches =
          matches &&
          materia.nombre
            .toLowerCase()
            .includes(this.searchTerm().toLowerCase());
      }

      if (this.selectedInstitution()) {
        matches =
          matches && materia.institucionId === this.selectedInstitution().id;
      }

      if (this.selectedLevel()) {
        matches = matches && materia.nivel === this.selectedLevel().id;
      }

      if (this.selectedModality()) {
        matches = matches && materia.modalidad === this.selectedModality().name;
      }

      // Agregar más filtros según necesites

      return matches;
    });

    this.materiasFiltradas.set(filteredResults);
  }

  showDetails(materia: Materia) {
    this.selectedMateria.set(materia);
    this.showDetailModal.set(true);
  }

  getModalidadSeverity(modalidad: any): any {
    switch (modalidad.toLowerCase()) {
      case 'presencial':
        return 'success';
      case 'en línea':
        return 'info';
      case 'híbrido':
        return 'warning';
      default:
        return 'info';
    }
  }
}
