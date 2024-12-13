// interfaces/asesor.interface.ts
export interface Asesor {
  id: number;
  nombre: string;
  especialidad: string;
  calificacion: number;
  descripcion: string;
  precio: number;
  disponibilidad: string;
  imagen: string;
  materias: number;
  experiencia: number;
  ubicacion: string;
  numResenas: number;
  satisfaccion?: string;
}

export interface FilterOption {
  name: string;
  code: string;
}
