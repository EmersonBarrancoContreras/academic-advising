import { Module } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { InstitutionsController } from './institutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carreras } from 'src/entities/carreras.entity';
import { SedesUniversitarias } from 'src/entities/sedesUniversitarias.entity';
import { Universidades } from 'src/entities/universidades.entity';
import { Colegios } from 'src/entities/colegios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Universidades,
      SedesUniversitarias,
      Carreras,
      Colegios,
    ]),
  ],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
