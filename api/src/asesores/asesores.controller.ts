import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AsesoresService } from './asesores.service';
import { CreateAsesorDto } from './dto/create-asesores.dto';

@Controller('asesores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsesoresController {
  constructor(private readonly asesoresService: AsesoresService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createAsesorDto: CreateAsesorDto) {
    return this.asesoresService.create(createAsesorDto);
  }

  @Get()
  @Roles('administrador', 'estudiante')
  findAll(
    @Query('validado') validado?: boolean,
    @Query('materias') materias?: number[],
  ) {
    return this.asesoresService.findAll({ validado, materiasIds: materias });
  }

  @Get(':id')
  @Roles('administrador', 'asesor', 'estudiante')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asesoresService.findOne(id);
  }

  @Get('usuario/:userId')
  @Roles('administrador', 'asesor')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.asesoresService.findByUserId(userId);
  }

  @Put(':id')
  @Roles('administrador', 'asesor')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAsesorDto: Partial<CreateAsesorDto>,
  ) {
    return this.asesoresService.update(id, updateAsesorDto);
  }

  @Put(':id/validar')
  @Roles('administrador')
  validar(@Param('id', ParseIntPipe) id: number) {
    return this.asesoresService.validar(id);
  }

  @Get(':id/asesorias')
  @Roles('administrador', 'asesor')
  getAsesorias(
    @Param('id', ParseIntPipe) id: number,
    @Query('estado') estado?: 'programada' | 'completada' | 'cancelada',
  ) {
    return this.asesoresService.getAsesorias(id, estado);
  }

  @Get(':id/materias')
  @Roles('administrador', 'asesor', 'estudiante')
  getMaterias(@Param('id', ParseIntPipe) id: number) {
    return this.asesoresService.getMaterias(id);
  }

  @Get(':id/especializaciones')
  @Roles('administrador', 'asesor', 'estudiante')
  getEspecializaciones(@Param('id', ParseIntPipe) id: number) {
    return this.asesoresService.getEspecializaciones(id);
  }
}
