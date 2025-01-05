import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionesController } from './evaluaciones.controller';
import { EvaluacionesService } from './evaluaciones.service';
import { Evaluaciones } from '../entities/evaluaciones.entity';
import { AsesoriasModule } from '../asesorias/asesorias.module';
import { AsesoresModule } from '../asesores/asesores.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluaciones]),
    AsesoriasModule,
    AsesoresModule,
  ],
  controllers: [EvaluacionesController],
  providers: [EvaluacionesService],
  exports: [EvaluacionesService],
})
export class EvaluacionesModule {}
