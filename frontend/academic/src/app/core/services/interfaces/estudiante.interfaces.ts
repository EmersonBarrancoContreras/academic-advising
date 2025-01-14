export interface Estudiante {
  id: number;
  idUsuario: number;
  fechaRegistro: Date;
  estado: boolean;
  asesorias?: Asesoria[];
}

export interface Asesoria {
  id: number;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
  estado: 'programada' | 'completada' | 'cancelada';
  linkVideoconferencia?: string;
  notas?: string;
  fechaRegistro: Date;
  costo: number;
  modalidad: 'presencial' | 'virtual';
  urlGrabacion?: string;
  idEstudiante: { idEstudiante: number };
  idAsesor: { idAsesor: number };
  idMateria: { idMateria: number };
}

export interface CreateEstudianteDto {
  idUsuario: number;
  estado?: boolean;
}

export interface UpdateEstudianteDto {
  estado?: boolean;
}

export interface PaginationDto {
  limit?: number;
  offset?: number;
}

export interface EstadisticasEstudiante {
  totalAsesorias: number;
  asesoriasCompletadas: number;
  asesoriasCanceladas: number;
  asesoriasProgramadas: number;
  horasTotales: number;
  promedioHorasPorMes: number;
}
