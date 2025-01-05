import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriasController } from './materias.controller';
import { MateriasService } from './materias.service';
import { Materias } from '../entities/materias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materias])],
  controllers: [MateriasController],
  providers: [MateriasService],
  exports: [MateriasService],
})
export class MateriasModule {}
