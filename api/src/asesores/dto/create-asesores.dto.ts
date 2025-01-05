import {
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  IsDecimal,
} from 'class-validator';

export class CreateAsesorDto {
  @IsNumber()
  idUsuario: number;

  @IsString()
  @IsOptional()
  tituloProfesional?: string;

  @IsNumber()
  @IsOptional()
  experienciaAnios?: number;

  @IsString()
  @IsOptional()
  descripcionPerfil?: string;

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  tarifaHora?: string;

  @IsBoolean()
  @IsOptional()
  estadoValidacion?: boolean;
}
