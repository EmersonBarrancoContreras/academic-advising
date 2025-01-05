import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  ValidateIf,
  IsInt,
  Min,
  Max,
  IsNumber,
} from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  // DTO para actualizar estudiante - similar al de creación pero con todos los campos opcionales

  @ApiPropertyOptional({
    description: 'Nivel académico del estudiante',
    enum: ['primaria', 'secundaria', 'universitario'],
  })
  @IsOptional()
  @IsEnum(['primaria', 'secundaria', 'universitario'], {
    message: 'El nivel académico debe ser primaria, secundaria o universitario',
  })
  nivelAcademico?: 'primaria' | 'secundaria' | 'universitario';

  @ApiPropertyOptional({
    description: 'Grado actual (para primaria y secundaria)',
    minimum: 1,
    maximum: 11,
  })
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.nivelAcademico && ['primaria', 'secundaria'].includes(o.nivelAcademico),
  )
  @IsInt({ message: 'El grado debe ser un número entero' })
  @Min(1, { message: 'El grado mínimo es 1' })
  @Max(11, { message: 'El grado máximo es 11' })
  gradoActual?: number;

  @ApiPropertyOptional({
    description: 'Semestre actual (para universitario)',
    minimum: 1,
    maximum: 12,
  })
  @IsOptional()
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsInt({ message: 'El semestre debe ser un número entero' })
  @Min(1, { message: 'El semestre mínimo es 1' })
  @Max(12, { message: 'El semestre máximo es 12' })
  semestreActual?: number;

  @ApiPropertyOptional({
    description: 'ID de la carrera (para universitario)',
  })
  @IsOptional()
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsNumber({}, { message: 'El ID de la carrera debe ser un número' })
  idCarrera?: number;

  @ApiPropertyOptional({
    description: 'ID del colegio (para primaria y secundaria)',
  })
  @IsOptional()
  @ValidateIf(
    (o) =>
      o.nivelAcademico && ['primaria', 'secundaria'].includes(o.nivelAcademico),
  )
  @IsNumber({}, { message: 'El ID del colegio debe ser un número' })
  idColegio?: number;

  @ApiPropertyOptional({
    description: 'ID de la sede universitaria (para universitario)',
  })
  @IsOptional()
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsNumber({}, { message: 'El ID de la sede debe ser un número' })
  idSede?: number;
}
