import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversidadesDto } from './create-universidades.dto';

export class UpdateUniversidadeDto extends PartialType(CreateUniversidadesDto) {}
