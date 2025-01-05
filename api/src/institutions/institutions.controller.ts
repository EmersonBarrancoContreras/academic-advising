import { Controller, Get, Query } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { FilterInstitucionesDto } from './dto/filter-instituciones.dto';
import { InstitucionResponseDto } from './dto/institution-response.dto';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Get()
  async obtenerInstituciones(
    @Query() filterDto: FilterInstitucionesDto,
  ): Promise<InstitucionResponseDto> {
    return await this.institutionsService.obtenerInstitucionesEducativas(
      filterDto,
    );
  }
}
