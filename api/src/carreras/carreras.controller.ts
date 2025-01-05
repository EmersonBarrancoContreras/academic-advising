// src/carreras/carreras.controller.ts
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
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Controller('carreras')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createCarreraDto: CreateCarreraDto) {
    return this.carrerasService.create(createCarreraDto);
  }

  @Get()
  @Roles('administrador', 'estudiante', 'asesor')
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.findOne(id);
  }

  @Get('universidad/:id')
  @Roles('administrador', 'estudiante', 'asesor')
  findByUniversidad(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.findByUniversidad(id);
  }

  @Put(':id')
  @Roles('administrador')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarreraDto: UpdateCarreraDto,
  ) {
    return this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete(':id')
  @Roles('administrador')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.remove(id);
  }

  @Get(':id/materias')
  @Roles('administrador', 'estudiante', 'asesor')
  getMaterias(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.getMaterias(id);
  }

  @Get(':id/estudiantes')
  @Roles('administrador')
  getEstudiantes(@Param('id', ParseIntPipe) id: number) {
    return this.carrerasService.getEstudiantes(id);
  }
}
