// src/reportes/reportes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';
import { Reportes } from '../entities/reportes.entity';
import { AsesoriasModule } from '../asesorias/asesorias.module';
import { PagosModule } from '../pagos/pagos.module';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { AsesoresModule } from '../asesores/asesores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reportes]),
    AsesoriasModule,
    PagosModule,
    EstudianteModule,
    AsesoresModule,
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
  exports: [ReportesService],
})
export class ReportesModule {}
