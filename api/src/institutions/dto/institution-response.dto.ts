import { ColegioDto } from "./colegio.dto";
import { UniversidadDto } from "./universidad.dto";

export class InstitucionResponseDto {
  universidades: UniversidadDto[];
  colegios: ColegioDto[];
}
