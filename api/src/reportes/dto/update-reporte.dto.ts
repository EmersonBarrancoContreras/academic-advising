import { PartialType } from '@nestjs/mapped-types';
import { GenerateReporteDto } from './generate-reporte.dto';

export class UpdateReporteDto extends PartialType(GenerateReporteDto) {}
