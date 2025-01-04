import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { Asesoria } from '../../interfaces/asesoria.interface';
import { Materia } from '../../interfaces/materia.interface';
import { EstadisticasEstudiante } from '../../interfaces/stats.interface';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    ProgressBarModule,
    ButtonModule,
    ToastModule,
    CardModule,
    MenuModule,
    SidebarModule,
    RouterModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export default class InicioComponent {
  proximasAsesorias: Asesoria[] = [];
  proximaAsesoria?: Asesoria;
  materiasActivas: Materia[] = [];
  estadisticas?: EstadisticasEstudiante;

  constructor(
    // private asesoriasService: AsesoriasService,
    // private estudiantesService: EstudiantesService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  // async ngOnInit() {
  //   try {
  //     // Obtenemos el ID del estudiante del usuario actual
  //     const user = this.authService.authUser.value;
  //     if (!user) return;

  //     // Cargamos los datos necesarios
  //     await Promise.all([
  //       this.cargarProximasAsesorias(user.id),
  //       this.cargarMateriasActivas(user.id),
  //       this.cargarEstadisticas(user.id),
  //     ]);
  //   } catch (error) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Error al cargar los datos del dashboard',
  //     });
  //   }
  // }

  // async cargarProximasAsesorias(idEstudiante: number) {
  //   const asesorias = await firstValueFrom(
  //     this.asesoriasService.getProximasAsesorias(idEstudiante)
  //   );
  //   this.proximasAsesorias = asesorias;
  //   this.proximaAsesoria = asesorias[0];
  // }

  // async cargarMateriasActivas(idEstudiante: number) {
  //   this.materiasActivas = await firstValueFrom(
  //     this.estudiantesService.getMateriasActivas(idEstudiante)
  //   );
  // }

  // async cargarEstadisticas(idEstudiante: number) {
  //   this.estadisticas = await firstValueFrom(
  //     this.estudiantesService.getEstadisticas(idEstudiante)
  //   );
  // }

  calcularProgresoMateria(materia: Materia): number {
    // Esta lógica dependerá de cómo quieras calcular el progreso
    // Por ejemplo, basado en asesorías completadas vs planificadas
    return 0; // Implementar lógica real
  }
}
