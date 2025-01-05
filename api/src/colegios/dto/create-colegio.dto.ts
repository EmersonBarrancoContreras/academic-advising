import { IsString, IsOptional } from 'class-validator';

export class CreateColegioDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  ciudad: string;

  @IsString()
  @IsOptional()
  fechaRegistro?: Date;
}
