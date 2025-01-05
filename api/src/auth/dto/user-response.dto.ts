import { Expose } from "class-transformer";

export class UserResponseDto {
  @Expose()
  idUsuario: number;

  @Expose()
  email: string;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  rol: string;

  @Expose()
  activo: boolean;
}
