export interface InstitucionOption {
  id: number;
  nombre: string;
  sedes?: SedeOption[];
  carreras?: CarreraOption[];
}

export interface SedeOption {
  id: number;
  nombre: string;
}

export interface CarreraOption {
  id: number;
  nombre: string;
}

export interface InstitucionesResponse {
  colegios: InstitucionOption[];
  universidades: InstitucionOption[];
}
