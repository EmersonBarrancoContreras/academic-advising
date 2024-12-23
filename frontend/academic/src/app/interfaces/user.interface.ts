export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: 'estudiante' | 'asesor' | 'administrador';
  activo: boolean;
  fechaRegistro: Date;
}
