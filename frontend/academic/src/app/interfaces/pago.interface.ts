import { Asesoria } from "./asesoria.interface";
import { Estudiante } from "./estudiante.interface";

export interface Pago {
  idPago: number;
  monto: number;
  estado: 'pendiente' | 'pagado' | 'cancelado' | 'reembolsado';
  fechaCreacion: Date;
  fechaPago?: Date;
  metodoPago?: string;
  referenciaPago?: string;
  asesoria: Asesoria;
  estudiante: Estudiante;
}
