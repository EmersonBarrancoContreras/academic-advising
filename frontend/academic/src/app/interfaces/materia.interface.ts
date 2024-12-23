export interface Materia {
  idMateria: number;
  nombre: string;
  codigo: string;
  nivelAcademico: 'primaria' | 'secundaria' | 'universitario';
  descripcion?: string;
  creditos: number;
  activa: boolean;
  departamento?: string;
  prerequisitos?: Materia[];
}
