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
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Controller('materias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  @Roles('administrador', 'estudiante', 'asesor')
  findAll(
    @Query('nivelAcademico') nivelAcademico?: string,
    @Query('idCarrera') idCarrera?: number,
    @Query('activa') activa?: boolean,
  ) {
    return this.materiasService.findAll({ nivelAcademico, idCarrera, activa });
  }

  @Get(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.findOne(id);
  }

  @Put(':id')
  @Roles('administrador')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMateriaDto: Partial<CreateMateriaDto>,
  ) {
    return this.materiasService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  @Roles('administrador')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.remove(id);
  }

  @Get(':id/prerequisitos')
  @Roles('administrador', 'estudiante', 'asesor')
  getPrerequisitos(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.getPrerequisitos(id);
  }

  @Get(':id/recursos')
  @Roles('administrador', 'estudiante', 'asesor')
  getRecursos(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.getRecursos(id);
  }

  @Get(':id/temas')
  @Roles('administrador', 'estudiante', 'asesor')
  getTemas(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.getTemas(id);
  }
}
