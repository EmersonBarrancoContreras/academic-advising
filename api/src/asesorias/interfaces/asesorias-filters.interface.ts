export interface AsesoriaFilters {
  estado?: 'programada' | 'completada' | 'cancelada';
  fecha?: Date;
  idAsesor?: number;
  idEstudiante?: number;
}
