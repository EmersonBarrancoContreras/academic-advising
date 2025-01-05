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
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ColegiosService } from './colegios.service';
import { CreateColegioDto } from './dto/create-colegio.dto';

@Controller('colegios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ColegiosController {
  constructor(private readonly colegiosService: ColegiosService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createColegioDto: CreateColegioDto) {
    return this.colegiosService.create(createColegioDto);
  }

  @Get()
  @Roles('administrador', 'estudiante', 'asesor')
  findAll() {
    return this.colegiosService.findAll();
  }

  @Get('ciudad/:ciudad')
  @Roles('administrador', 'estudiante', 'asesor')
  findByCity(@Param('ciudad') ciudad: string) {
    return this.colegiosService.findByCity(ciudad);
  }

  @Get(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.colegiosService.findOne(id);
  }

  @Put(':id')
  @Roles('administrador')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColegioDto: Partial<CreateColegioDto>,
  ) {
    return this.colegiosService.update(id, updateColegioDto);
  }

  @Delete(':id')
  @Roles('administrador')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colegiosService.remove(id);
  }

  @Get(':id/estudiantes')
  @Roles('administrador')
  getEstudiantes(@Param('id', ParseIntPipe) id: number) {
    return this.colegiosService.getEstudiantes(id);
  }
}
