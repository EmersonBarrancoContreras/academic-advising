import { User } from "@services/auth.service";

export interface Notificacion {
  idNotificacion: number;
  titulo: string;
  mensaje: string;
  tipo: 'asesoria' | 'sistema' | 'pago' | 'recordatorio';
  leida: boolean;
  fechaCreacion: Date;
  fechaLectura?: Date;
  usuario: User;
}
