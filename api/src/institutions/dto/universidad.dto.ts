import { CarreraDto } from './carrera.dto';
import { SedeDto } from './sede.dto';

export class UniversidadDto {
  idUniversidad: number;
  nombre: string;
  direccion?: string;
  ciudad: string;
  pais: string;
  sitioWeb?: string;
  telefono?: string;
  fechaRegistro?: Date;
  activa: boolean;
  sedes: SedeDto[];
  carreras: CarreraDto[];
}
