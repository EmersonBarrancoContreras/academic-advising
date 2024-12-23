import { Asesor } from "./asesor.interface";
import { Estudiante } from "./estudiante.interface";
import { Materia } from "./materia.interface";

export interface Asesoria {
  idAsesoria: number;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
  estado: 'programada' | 'completada' | 'cancelada';
  linkVideoconferencia?: string;
  notas?: string;
  fechaRegistro: Date;
  costo: number;
  modalidad?: string;
  urlGrabacion?: string;
  estudiante: Estudiante;
  asesor: Asesor;
  materia: Materia;
}
