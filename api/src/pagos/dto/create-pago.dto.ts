import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePagoDto {
  @IsNumber()
  idAsesoria: number;

  @IsNumber()
  idEstudiante: number;

  @IsNumber()
  @Type(() => Number)
  monto: number;

  @IsEnum(['pendiente', 'pagado', 'cancelado', 'reembolsado'])
  estado: 'pendiente' | 'pagado' | 'cancelado' | 'reembolsado';

  @IsString()
  @IsOptional()
  metodoPago?: string;

  @IsString()
  @IsOptional()
  referenciaPago?: string;
}
