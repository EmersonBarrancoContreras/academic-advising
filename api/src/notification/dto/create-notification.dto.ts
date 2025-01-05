import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateNotificacionDto {
  @IsString()
  titulo: string;

  @IsString()
  mensaje: string;

  @IsEnum(['asesoria', 'sistema', 'pago', 'recordatorio'])
  tipo: 'asesoria' | 'sistema' | 'pago' | 'recordatorio';

  @IsNumber()
  idUsuario: number;

  @IsNumber()
  @IsOptional()
  idReferencia?: number; // ID de la entidad relacionada (asesoria, pago, etc.)
}
