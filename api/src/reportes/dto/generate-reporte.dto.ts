import {
  IsEnum,
  IsString,
  IsOptional,
  IsObject,
  IsDateString,
} from 'class-validator';

export class GenerateReporteDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsEnum(['asesorias', 'pagos', 'usuarios', 'rendimiento', 'general'])
  tipo: 'asesorias' | 'pagos' | 'usuarios' | 'rendimiento' | 'general';

  @IsDateString()
  @IsOptional()
  fechaInicio?: Date;

  @IsDateString()
  @IsOptional()
  fechaFin?: Date;

  @IsObject()
  @IsOptional()
  filtros?: Record<string, any>;
}
