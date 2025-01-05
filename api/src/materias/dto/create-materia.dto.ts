// src/materias/dto/create-materia.dto.ts
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
export class CreateMateriaDto {
  @IsString()
  nombre: string;

  @IsEnum(['primaria', 'secundaria', 'universitario'])
  nivelAcademico: 'primaria' | 'secundaria' | 'universitario';

  @IsNumber()
  @IsOptional()
  gradoEscolar?: number;

  @IsNumber()
  @IsOptional()
  idCarrera?: number;

  @IsNumber()
  @IsOptional()
  semestre?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  activa?: boolean;

  @IsString()
  codigo: string;

  @IsString()
  @IsOptional()
  departamento?: string;

  @IsNumber()
  creditos: number;

  @IsNumber()
  @IsOptional()
  cupoTotal?: number;

  @IsNumber()
  @IsOptional()
  cupoDisponible?: number;

  @IsString()
  @IsOptional()
  modalidad?: string;

  @IsString()
  @IsOptional()
  horario?: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  prerequisitos?: number[];
}
