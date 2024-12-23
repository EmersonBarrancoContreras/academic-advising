import { Asesor } from "./asesor.interface";
import { Materia } from "./materia.interface";

export interface AreaEspecializacion {
  idArea: number;
  nombre: string;
  descripcion?: string;
  nivelAcademico: 'primaria' | 'secundaria' | 'universitario';
  activo: boolean;
  areaPadre?: AreaEspecializacion; // Para jerarquía de áreas
  subAreas?: AreaEspecializacion[];
  materias?: Materia[];
}

export interface Especializacion {
  idEspecializacion: number;
  idAsesor: number;
  idTema: number;
  nivelExperiencia?: string;
  fechaRegistro: Date;
  asesor: Asesor;
  tema: TemaMateria;
}

export interface TemaMateria {
  idTema: number;
  idMateria: number;
  nombre: string;
  descripcion?: string;
  materia: Materia;
  especializaciones?: Especializacion[];
}
