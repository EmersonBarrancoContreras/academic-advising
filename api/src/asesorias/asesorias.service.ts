import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Equal } from 'typeorm';
import { Asesorias } from '../entities/asesorias.entity';
import { CreateAsesoriaDto } from './dto/create-asesoria.dto';
import { AsesoriaFilters } from './interfaces/asesorias-filters.interface';

@Injectable()
export class AsesoriasService {
  constructor(
    @InjectRepository(Asesorias)
    private asesoriasRepository: Repository<Asesorias>,
  ) {}

  async create(createAsesoriaDto: CreateAsesoriaDto) {
    // Validar disponibilidad del asesor
    const existingAsesoria = await this.asesoriasRepository.findOne({
      where: {
        idAsesor: { idAsesor: createAsesoriaDto.idAsesor }, // Ajustado para relación
        fechaHoraInicio: Between(
          createAsesoriaDto.fechaHoraInicio,
          createAsesoriaDto.fechaHoraFin,
        ),
      },
    });

    if (existingAsesoria) {
      throw new BadRequestException(
        'El asesor no está disponible en este horario',
      );
    }

    // Crear la asesoría con el formato correcto
    const newAsesoria = this.asesoriasRepository.create({
      fechaHoraInicio: createAsesoriaDto.fechaHoraInicio,
      fechaHoraFin: createAsesoriaDto.fechaHoraFin,
      estado: createAsesoriaDto.estado,
      linkVideoconferencia: createAsesoriaDto.linkVideoconferencia,
      notas: createAsesoriaDto.notas,
      fechaRegistro: new Date(),
      costo: createAsesoriaDto.costo,
      modalidad: createAsesoriaDto.modalidad,
      urlGrabacion: createAsesoriaDto.urlGrabacion,
      idEstudiante: { idEstudiante: createAsesoriaDto.idEstudiante } as any, // Formato para relación
      idAsesor: { idAsesor: createAsesoriaDto.idAsesor } as any, // Formato para relación
      idMateria: { idMateria: createAsesoriaDto.idMateria } as any, // Formato para relación
    });

    return this.asesoriasRepository.save(newAsesoria);
  }

  async findAll(filters: AsesoriaFilters) {
    const query = this.asesoriasRepository
      .createQueryBuilder('asesoria')
      .leftJoinAndSelect('asesoria.idAsesor', 'asesor')
      .leftJoinAndSelect('asesoria.idEstudiante', 'estudiante')
      .leftJoinAndSelect('asesoria.idMateria', 'materia');

    if (filters?.estado) {
      query.andWhere('asesoria.estado = :estado', { estado: filters.estado });
    }

    if (filters?.fecha) {
      query.andWhere('DATE(asesoria.fechaHoraInicio) = DATE(:fecha)', {
        fecha: filters.fecha,
      });
    }

    if (filters?.idAsesor) {
      query.andWhere('asesor.idAsesor = :idAsesor', {
        idAsesor: filters.idAsesor,
      });
    }

    if (filters?.idEstudiante) {
      query.andWhere('estudiante.idEstudiante = :idEstudiante', {
        idEstudiante: filters.idEstudiante,
      });
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const asesoria = await this.asesoriasRepository.findOne({
      where: { idAsesoria: id },
      relations: ['idAsesor', 'idEstudiante', 'idMateria'],
    });

    if (!asesoria) {
      throw new NotFoundException('Asesoría no encontrada');
    }

    return asesoria;
  }

  async update(id: number, updateAsesoriaDto: Partial<CreateAsesoriaDto>) {
    const asesoria = await this.findOne(id);
    Object.assign(asesoria, updateAsesoriaDto);
    return this.asesoriasRepository.save(asesoria);
  }

  async remove(id: number) {
    const asesoria = await this.findOne(id);
    return this.asesoriasRepository.remove(asesoria);
  }

  async cambiarEstado(
    id: number,
    estado: 'programada' | 'completada' | 'cancelada',
  ) {
    const asesoria = await this.findOne(id);
    asesoria.estado = estado;
    return this.asesoriasRepository.save(asesoria);
  }

  async getProximasAsesorias(idEstudiante: number) {
    return this.asesoriasRepository.find({
      where: {
        idEstudiante: { idEstudiante: idEstudiante } as any,
        estado: 'programada',
        fechaHoraInicio: Between(
          new Date(),
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ),
      },
      relations: ['idAsesor', 'idMateria'],
      order: {
        fechaHoraInicio: 'ASC',
      },
    });
  }
}
