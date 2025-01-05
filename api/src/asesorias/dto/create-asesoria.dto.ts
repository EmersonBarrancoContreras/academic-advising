import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsesoriaDto {
  @Type(() => Date)
  @IsDate()
  fechaHoraInicio: Date;

  @Type(() => Date)
  @IsDate()
  fechaHoraFin: Date;

  @IsEnum(['programada', 'completada', 'cancelada'])
  estado: 'programada' | 'completada' | 'cancelada';

  @IsNumber()
  idEstudiante: number;

  @IsNumber()
  idAsesor: number;

  @IsNumber()
  idMateria: number;

  @IsString()
  @IsOptional()
  linkVideoconferencia?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsString() // Cambiado a string para coincidir con el tipo de la entidad
  @IsOptional()
  costo?: string;

  @IsString()
  @IsOptional()
  modalidad?: string;

  @IsString()
  @IsOptional()
  urlGrabacion?: string;
}
