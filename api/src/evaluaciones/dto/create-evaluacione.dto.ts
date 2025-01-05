import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateEvaluacionDto {
  @IsNumber()
  idAsesoria: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  calificacion: number;

  @IsString()
  @IsOptional()
  comentario?: string;

  @IsNumber()
  idEstudiante: number;

  @IsNumber()
  idAsesor: number;

  @IsString()
  @IsOptional()
  aspectosDestacados?: string;

  @IsString()
  @IsOptional()
  aspectosMejora?: string;
}
