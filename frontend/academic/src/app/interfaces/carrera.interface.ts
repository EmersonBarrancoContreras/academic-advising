import { Universidad } from "./institucion.interface";
import { Materia } from "./materia.interface";

export interface Carrera {
  idCarrera: number;
  nombre: string;
  descripcion?: string;
  numeroSemestres: number;
  universidad: Universidad;
  materias: Materia[];
}
