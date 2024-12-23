import { User } from '@services/auth.service';
import { Materia } from './materia.interface';
import {
  AreaEspecializacion,
  Especializacion,
} from './especializacion.interface';

export interface Asesor {
  idAsesor: number;
  calificacionPromedio: number;
  estadoValidacion: boolean;
  descripcionPerfil?: string;
  fechaValidacion?: Date;
  tarifaHora: number;
  experienciaAnios?: number;
  tituloProfesional?: string;
  usuario: User;
  materias: Materia[];
  especializaciones: Especializacion[];
  areasEspecializacion: AreaEspecializacion[];
}
