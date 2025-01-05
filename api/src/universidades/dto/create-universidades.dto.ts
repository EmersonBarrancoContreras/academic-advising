import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUniversidadesDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  ciudad: string;

  @IsString()
  @IsOptional()
  pais?: string = 'Colombia';

  @IsString()
  @IsOptional()
  sitioWeb?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsBoolean()
  @IsOptional()
  activa?: boolean = true;
}
