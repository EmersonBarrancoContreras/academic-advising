import { User } from "@services/auth.service";
import { Sede } from "@services/interfaces/institutiones.interfaces";
import { Carrera } from "./carrera.interface";
import { Colegio } from "./institucion.interface";

export interface Estudiante {
  idEstudiante: number;
  nivelAcademico: 'primaria' | 'secundaria' | 'universitario';
  gradoActual?: number;
  semestreActual?: number;
  idCarrera?: number;
  idColegio?: number;
  idSede?: number;
  usuario: User;
  carrera?: Carrera;
  colegio?: Colegio;
  sede?: Sede;
}
