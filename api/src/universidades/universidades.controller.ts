import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UniversidadesService } from './universidades.service';
import { CreateUniversidadesDto } from './dto/create-universidades.dto';

@Controller('universidades')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UniversidadesController {
  constructor(private readonly universidadesService: UniversidadesService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createUniversidadDto: CreateUniversidadesDto) {
    return this.universidadesService.create(createUniversidadDto);
  }

  @Get()
  @Roles('administrador', 'estudiante', 'asesor')
  findAll() {
    return this.universidadesService.findAll();
  }

  @Get(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.universidadesService.findOne(id);
  }

  @Put(':id')
  @Roles('administrador')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUniversidadDto: Partial<CreateUniversidadesDto>,
  ) {
    return this.universidadesService.update(id, updateUniversidadDto);
  }

  @Delete(':id')
  @Roles('administrador')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.universidadesService.remove(id);
  }

  @Get(':id/carreras')
  @Roles('administrador', 'estudiante', 'asesor')
  getCarreras(@Param('id', ParseIntPipe) id: number) {
    return this.universidadesService.getCarreras(id);
  }

  @Get(':id/sedes')
  @Roles('administrador', 'estudiante', 'asesor')
  getSedes(@Param('id', ParseIntPipe) id: number) {
    return this.universidadesService.getSedes(id);
  }

  @Get(':id/materias')
  @Roles('administrador', 'estudiante', 'asesor')
  getMaterias(@Param('id', ParseIntPipe) id: number) {
    return this.universidadesService.getMaterias(id);
  }

  @Get('ciudad/:ciudad')
  @Roles('administrador', 'estudiante', 'asesor')
  findByCity(@Param('ciudad') ciudad: string) {
    return this.universidadesService.findByCity(ciudad);
  }
}
