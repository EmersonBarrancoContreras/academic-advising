// src/evaluaciones/evaluaciones.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { EvaluacionesService } from './evaluaciones.service';
import { CreateEvaluacionDto } from './dto/create-evaluacione.dto';

@Controller('evaluaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  @Post()
  @Roles('estudiante')
  create(@Body() createEvaluacionDto: CreateEvaluacionDto) {
    return this.evaluacionesService.create(createEvaluacionDto);
  }

  @Get()
  @Roles('administrador')
  findAll() {
    return this.evaluacionesService.findAll();
  }

  @Get(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.findOne(id);
  }

  @Get('asesor/:id')
  @Roles('administrador', 'asesor')
  getEvaluacionesByAsesor(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.getEvaluacionesByAsesor(id);
  }

  @Get('estudiante/:id')
  @Roles('administrador', 'estudiante')
  getEvaluacionesByEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.getEvaluacionesByEstudiante(id);
  }

  @Get('asesor/:id/estadisticas')
  @Roles('administrador', 'asesor')
  getEstadisticasAsesor(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.getEstadisticasAsesor(id);
  }
}
