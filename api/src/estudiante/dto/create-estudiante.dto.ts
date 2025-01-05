import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  Max,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEstudianteDto {
  @ApiProperty({
    description: 'Nivel académico del estudiante',
    enum: ['primaria', 'secundaria', 'universitario'],
  })
  @IsEnum(['primaria', 'secundaria', 'universitario'], {
    message: 'El nivel académico debe ser primaria, secundaria o universitario',
  })
  nivelAcademico: 'primaria' | 'secundaria' | 'universitario';

  @ApiPropertyOptional({
    description: 'Grado actual (requerido para primaria y secundaria)',
    minimum: 1,
    maximum: 11,
  })
  @ValidateIf((o) => ['primaria', 'secundaria'].includes(o.nivelAcademico))
  @IsInt({ message: 'El grado debe ser un número entero' })
  @Min(1, { message: 'El grado mínimo es 1' })
  @Max(11, { message: 'El grado máximo es 11' })
  @Type(() => Number)
  gradoActual?: number;

  @ApiPropertyOptional({
    description: 'Semestre actual (requerido para universitario)',
    minimum: 1,
    maximum: 12,
  })
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsInt({ message: 'El semestre debe ser un número entero' })
  @Min(1, { message: 'El semestre mínimo es 1' })
  @Max(12, { message: 'El semestre máximo es 12' })
  @Type(() => Number)
  semestreActual?: number;

  @ApiPropertyOptional({
    description: 'ID de la carrera (requerido para universitario)',
  })
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsInt({ message: 'El ID de la carrera debe ser un número' })
  @Type(() => Number)
  idCarrera?: number;

  @ApiPropertyOptional({
    description: 'ID del colegio (requerido para primaria y secundaria)',
  })
  @ValidateIf((o) => ['primaria', 'secundaria'].includes(o.nivelAcademico))
  @IsInt({ message: 'El ID del colegio debe ser un número' })
  @Type(() => Number)
  idColegio?: number;

  @ApiPropertyOptional({
    description: 'ID de la sede universitaria (requerido para universitario)',
  })
  @ValidateIf((o) => o.nivelAcademico === 'universitario')
  @IsInt({ message: 'El ID de la sede debe ser un número' })
  @Type(() => Number)
  idSede?: number;

  @ApiProperty({
    description: 'ID del usuario asociado al estudiante',
  })
  @IsInt({ message: 'El ID del usuario debe ser un número' })
  @Type(() => Number)
  idUsuario: number;
}
