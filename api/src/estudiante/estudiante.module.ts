import { Asesorias } from './../entities/asesorias.entity';
import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiante.service';
import { EstudiantesController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carreras } from 'src/entities/carreras.entity';
import { Colegios } from 'src/entities/colegios.entity';
import { SedesUniversitarias } from 'src/entities/sedesUniversitarias.entity';
import { Estudiantes } from 'src/entities/estudiantes.entity';
import { Usuarios } from 'src/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiantes,
      Usuarios,
      Carreras,
      Colegios,
      SedesUniversitarias,
      Asesorias,
    ]),
  ],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService],
})
export class EstudianteModule {}
