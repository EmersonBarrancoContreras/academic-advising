import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ReportesService } from './reportes.service';
import { GenerateReporteDto } from './dto/generate-reporte.dto';

@Controller('reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('administrador')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post()
  generate(
    @Body() generateReporteDto: GenerateReporteDto,
    @GetUser('id') userId: number,
  ) {
    return this.reportesService.generate(generateReporteDto, userId);
  }

  @Get()
  findAll() {
    return this.reportesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.findOne(id);
  }

  @Get('tipo/:tipo')
  findByType(@Param('tipo') tipo: 'asesorias' | 'pagos' | 'usuarios' | 'rendimiento' | 'general') {
    return this.reportesService.findByType(tipo);
  }
}
