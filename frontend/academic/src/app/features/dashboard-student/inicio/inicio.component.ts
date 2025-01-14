import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { MessageService } from 'primeng/api';
import { Asesoria } from '@interfaces/asesoria.interface';
import { Materia } from '@interfaces/materia.interface';
import { EstadisticasEstudiante } from '@interfaces/stats.interface';
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
export default class InicioComponent implements OnInit {
  proximasAsesorias: Asesoria[] = [];
  proximaAsesoria?: Asesoria;
  materiasActivas: Materia[] = [];
  estadisticas?: EstadisticasEstudiante;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    try {
      // Obtener usuario autenticado
      const user = this.authService.authUser.value;
      if (!user) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario no autenticado',
        });
        return;
      }

      // Cargar datos del usuario
      await Promise.all([this.cargarEstadisticas(user.id)]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los datos del dashboard',
      });
    }
  }

  private async cargarEstadisticas(idEstudiante: number) {}

  calcularProgresoMateria(materia: Materia): number {
    // Esta lógica dependerá de cómo quieras calcular el progreso
    // Por ejemplo, basado en asesorías completadas vs planificadas
    return 0; // Implementar lógica real
  }
}
