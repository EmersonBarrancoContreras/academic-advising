import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversidadesController } from './universidades.controller';
import { UniversidadesService } from './universidades.service';
import { Universidades } from '../entities/universidades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Universidades])],
  controllers: [UniversidadesController],
  providers: [UniversidadesService],
  exports: [UniversidadesService],
})
export class UniversidadesModule {}
