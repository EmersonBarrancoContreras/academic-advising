export interface Institucion {
  id: number;
  nombre: string;
  sedes?: Sede[];
  carreras?: Carrera[];
}

export interface Sede {
  id: number;
  nombre: string;
}

export interface Carrera {
  id: number;
  nombre: string;
}

export interface InstitucionesResponse {
  colegios: Institucion[];
  universidades: Institucion[];
}
