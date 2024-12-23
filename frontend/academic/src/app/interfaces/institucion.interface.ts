import { Sede } from '@services/interfaces/institutiones.interfaces';
import { Carrera } from './carrera.interface';

export interface Institucion {
  id: number;
  nombre: string;
  direccion?: string;
  ciudad: string;
  telefono?: string;
  activa: boolean;
  fechaRegistro: Date;
}

export interface Universidad extends Institucion {
  pais: string;
  sitioWeb?: string;
  sedes: Sede[];
  carreras: Carrera[];
}

export interface Colegio extends Institucion {
  // Campos específicos de colegio si los hay
}
