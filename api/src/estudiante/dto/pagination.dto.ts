import {
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Número de elementos a retornar',
    default: 10,
    minimum: 1,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Número de elementos a saltar',
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional({
    description: 'Término de búsqueda',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Nivel académico para filtrar',
    enum: ['primaria', 'secundaria', 'universitario'],
  })
  @IsOptional()
  @IsEnum(['primaria', 'secundaria', 'universitario'])
  nivelAcademico?: 'primaria' | 'secundaria' | 'universitario';

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
  })
  @IsOptional()
  @IsString()
  orderBy?: string;

  @ApiPropertyOptional({
    description: 'Dirección del ordenamiento',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderDirection?: 'ASC' | 'DESC';
}
