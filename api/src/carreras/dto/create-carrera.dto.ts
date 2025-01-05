import { IsString, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  numeroSemestres: number;

  @IsNumber()
  idUniversidad: number;
}
