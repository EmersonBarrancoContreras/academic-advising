export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface AsesoriaFilters extends BaseFilters {
  estado?: 'programada' | 'completada' | 'cancelada';
  fechaInicio?: Date;
  fechaFin?: Date;
  idAsesor?: number;
  idEstudiante?: number;
  idMateria?: number;
}

export interface EstudianteFilters extends BaseFilters {
  nivelAcademico?: 'primaria' | 'secundaria' | 'universitario';
  idCarrera?: number;
  idColegio?: number;
  idSede?: number;
}
