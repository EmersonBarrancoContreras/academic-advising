import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AsesoriasService } from './asesorias.service';
import { CreateAsesoriaDto } from './dto/create-asesoria.dto';

@Controller('asesorias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsesoriasController {
  constructor(private readonly asesoriasService: AsesoriasService) {}

  @Post()
  @Roles('administrador', 'estudiante')
  create(@Body() createAsesoriaDto: CreateAsesoriaDto) {
    return this.asesoriasService.create(createAsesoriaDto);
  }

  @Get()
  @Roles('administrador', 'asesor')
  findAll(
    @Query('estado') estado?: 'programada' | 'completada' | 'cancelada',
    @Query('fecha') fecha?: Date,
    @Query('idAsesor') idAsesor?: number,
    @Query('idEstudiante') idEstudiante?: number,
  ) {
    return this.asesoriasService.findAll({
      estado,
      fecha,
      idAsesor,
      idEstudiante,
    });
  }

  @Get(':id')
  @Roles('administrador', 'asesor', 'estudiante')
  findOne(@Param('id') id: number) {
    return this.asesoriasService.findOne(id);
  }

  @Put(':id')
  @Roles('administrador', 'estudiante')
  update(
    @Param('id') id: number,
    @Body() updateAsesoriaDto: Partial<CreateAsesoriaDto>,
  ) {
    return this.asesoriasService.update(id, updateAsesoriaDto);
  }

  @Delete(':id')
  @Roles('administrador')
  remove(@Param('id') id: number) {
    return this.asesoriasService.remove(id);
  }

  @Put(':id/estado')
  @Roles('administrador', 'asesor')
  cambiarEstado(
    @Param('id') id: number,
    @Body('estado') estado: 'programada' | 'completada' | 'cancelada',
  ) {
    return this.asesoriasService.cambiarEstado(id, estado);
  }

  @Get('estudiante/:idEstudiante/proximas')
  @Roles('administrador', 'estudiante')
  getProximasAsesorias(@Param('idEstudiante') idEstudiante: number) {
    return this.asesoriasService.getProximasAsesorias(idEstudiante);
  }
}
