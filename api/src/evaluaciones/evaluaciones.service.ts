import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluaciones } from '../entities/evaluaciones.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacione.dto';

@Injectable()
export class EvaluacionesService {
  constructor(
    @InjectRepository(Evaluaciones)
    private evaluacionesRepository: Repository<Evaluaciones>,
  ) {}

  async create(createEvaluacionDto: CreateEvaluacionDto) {
    // Verificar si ya existe una evaluación para esta asesoría
    const existingEvaluacion = await this.evaluacionesRepository.findOne({
      where: {
        idAsesoria: { idAsesoria: createEvaluacionDto.idAsesoria },
      },
    });

    if (existingEvaluacion) {
      throw new ConflictException('Esta asesoría ya ha sido evaluada');
    }

    // Crear la evaluación
    const evaluacion = new Evaluaciones();
    evaluacion.calificacion = createEvaluacionDto.calificacion;
    evaluacion.comentario = createEvaluacionDto.comentario;
    evaluacion.aspectosDestacados = createEvaluacionDto.aspectosDestacados;
    evaluacion.aspectosMejora = createEvaluacionDto.aspectosMejora;
    evaluacion.fechaEvaluacion = new Date();

    // Asignar relaciones
    evaluacion.idAsesoria = Promise.resolve({
      idAsesoria: createEvaluacionDto.idAsesoria,
    } as any);
    evaluacion.idEstudiante = Promise.resolve({
      idEstudiante: createEvaluacionDto.idEstudiante,
    } as any);
    evaluacion.idAsesor = Promise.resolve({
      idAsesor: createEvaluacionDto.idAsesor,
    } as any);

    return this.evaluacionesRepository.save(evaluacion);
  }

  async findAll() {
    return this.evaluacionesRepository.find({
      relations: {
        idAsesoria: true,
        idEstudiante: true,
        idAsesor: true,
      },
    });
  }

  async findOne(id: number) {
    const evaluacion = await this.evaluacionesRepository.findOne({
      where: { idEvaluacion: id },
      relations: {
        idAsesoria: true,
        idEstudiante: true,
        idAsesor: true,
      },
    });

    if (!evaluacion) {
      throw new NotFoundException('Evaluación no encontrada');
    }

    return evaluacion;
  }

  async getEvaluacionesByAsesor(idAsesor: number) {
    return this.evaluacionesRepository.find({
      where: {
        idAsesor: { idAsesor },
      },
      relations: {
        idAsesoria: true,
        idEstudiante: true,
      },
    });
  }

  async getEvaluacionesByEstudiante(idEstudiante: number) {
    return this.evaluacionesRepository.find({
      where: {
        idEstudiante: { idEstudiante },
      },
      relations: {
        idAsesoria: true,
        idAsesor: true,
      },
    });
  }

  async getEstadisticasAsesor(idAsesor: number) {
    const evaluaciones = await this.evaluacionesRepository.find({
      where: {
        idAsesor: { idAsesor },
      },
    });

    if (evaluaciones.length === 0) {
      return {
        totalEvaluaciones: 0,
        promedioCalificacion: 0,
        distribucionCalificaciones: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };
    }

    const sumaCalificaciones = evaluaciones.reduce(
      (sum, evaluacion) => sum + Number(evaluacion.calificacion),
      0,
    );

    return {
      totalEvaluaciones: evaluaciones.length,
      promedioCalificacion: Number(
        (sumaCalificaciones / evaluaciones.length).toFixed(1),
      ),
      distribucionCalificaciones: {
        5: evaluaciones.filter((e) => Number(e.calificacion) === 5).length,
        4: evaluaciones.filter((e) => Number(e.calificacion) === 4).length,
        3: evaluaciones.filter((e) => Number(e.calificacion) === 3).length,
        2: evaluaciones.filter((e) => Number(e.calificacion) === 2).length,
        1: evaluaciones.filter((e) => Number(e.calificacion) === 1).length,
      },
      aspectosDestacados: evaluaciones
        .filter((e) => e.aspectosDestacados)
        .map((e) => e.aspectosDestacados),
      aspectosMejora: evaluaciones
        .filter((e) => e.aspectosMejora)
        .map((e) => e.aspectosMejora),
    };
  }
}
