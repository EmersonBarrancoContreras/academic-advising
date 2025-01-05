import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesorDto } from './create-asesores.dto';

export class UpdateAsesoreDto extends PartialType(CreateAsesorDto) {}
