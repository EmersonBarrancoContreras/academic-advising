import { User } from "@services/auth.service";

export interface Reporte {
  idReporte: number;
  titulo: string;
  descripcion?: string;
  tipo: 'asesorias' | 'pagos' | 'usuarios' | 'rendimiento' | 'general';
  datos: any; // Tipado específico según el tipo de reporte
  fechaGeneracion: Date;
  usuarioGenerador: User;
}
