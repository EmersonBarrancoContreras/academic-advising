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
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  @Roles('administrador')
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  @Get()
  @Roles('administrador')
  findAll(
    @Query('estado') estado?: string,
    @Query('fechaInicio') fechaInicio?: Date,
    @Query('fechaFin') fechaFin?: Date,
    @Query('idEstudiante') idEstudiante?: number,
  ) {
    return this.pagosService.findAll({
      estado,
      fechaInicio,
      fechaFin,
      idEstudiante,
    });
  }

  @Get(':id')
  @Roles('administrador', 'estudiante')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.findOne(id);
  }

  @Put(':id/estado')
  @Roles('administrador')
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado')
    estado: 'pendiente' | 'pagado' | 'cancelado' | 'reembolsado',
  ) {
    return this.pagosService.cambiarEstado(id, estado);
  }

  @Get('estudiante/:id')
  @Roles('administrador', 'estudiante')
  getPagosEstudiante(@Param('id', ParseIntPipe) id: number) {
    return this.pagosService.getPagosEstudiante(id);
  }

  @Get('estadisticas')
  @Roles('administrador')
  getEstadisticasPagos(
    @Query('fechaInicio') fechaInicio: Date,
    @Query('fechaFin') fechaFin: Date,
  ) {
    return this.pagosService.getEstadisticasPagos(fechaInicio, fechaFin);
  }
}
