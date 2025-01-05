import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluacionDto } from './create-evaluacione.dto';

export class UpdateEvaluacioneDto extends PartialType(CreateEvaluacionDto) {}
