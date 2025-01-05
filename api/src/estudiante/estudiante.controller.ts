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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { EstudiantesService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PaginationDto } from './dto/pagination.dto';

@ApiTags('Estudiantes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @Roles('administrador')
  @ApiOperation({ summary: 'Crear perfil de estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente',
  })
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  @Get()
  @Roles('administrador', 'asesor')
  @ApiOperation({ summary: 'Obtener lista de estudiantes' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.estudiantesService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('administrador', 'asesor', 'estudiante')
  @ApiOperation({ summary: 'Obtener estudiante por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.findOne(id);
  }

  @Get('usuario/:userId')
  @Roles('administrador', 'estudiante')
  @ApiOperation({ summary: 'Obtener estudiante por ID de usuario' })
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.estudiantesService.findByUserId(userId);
  }

  @Put(':id')
  @Roles('administrador', 'estudiante')
  @ApiOperation({ summary: 'Actualizar información de estudiante' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }

  @Delete(':id')
  @Roles('administrador')
  @ApiOperation({ summary: 'Eliminar estudiante' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.remove(id);
  }

  @Get(':id/asesorias')
  @Roles('administrador', 'estudiante')
  @ApiOperation({ summary: 'Obtener asesorías del estudiante' })
  getAsesorias(
    @Param('id', ParseIntPipe) id: number,
    @Query('estado') estado?: 'programada' | 'completada' | 'cancelada',
  ) {
    return this.estudiantesService.getAsesoriasEstudiante(id, estado);
  }

  @Get(':id/asesorias/proximas')
  @Roles('administrador', 'estudiante')
  @ApiOperation({ summary: 'Obtener próximas asesorías del estudiante' })
  getAsesoriasProximas(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.getAsesoriasProximasEstudiante(id);
  }

  @Get(':id/estadisticas')
  @Roles('administrador', 'estudiante')
  @ApiOperation({ summary: 'Obtener estadísticas del estudiante' })
  getEstadisticas(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.getEstadisticasEstudiante(id);
  }

  @Get('buscar')
  @Roles('administrador', 'asesor')
  @ApiOperation({ summary: 'Buscar estudiantes por nombre' })
  buscarPorNombre(
    @Query('nombre') nombre: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.estudiantesService.buscarEstudiantesPorNombre(
      nombre,
      paginationDto,
    );
  }
}
