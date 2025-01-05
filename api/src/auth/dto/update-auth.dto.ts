export declare class UpdateUserDto {
  email?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  rol?: 'estudiante' | 'asesor' | 'administrador';
  activo?: boolean;
}
