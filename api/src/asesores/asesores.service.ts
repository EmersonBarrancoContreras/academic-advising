import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asesores } from '../entities/asesores.entity';
import { CreateAsesorDto } from './dto/create-asesores.dto';

@Injectable()
export class AsesoresService {
  constructor(
    @InjectRepository(Asesores)
    private asesoresRepository: Repository<Asesores>,
  ) {}

  async create(createAsesorDto: CreateAsesorDto) {
    // Verificar si el usuario ya tiene un perfil de asesor
    const existingAsesor = await this.asesoresRepository.findOne({
      where: {
        idUsuario: { idUsuario: createAsesorDto.idUsuario },
      },
    });

    if (existingAsesor) {
      throw new ConflictException('El usuario ya tiene un perfil de asesor');
    }

    const asesor = new Asesores();
    Object.assign(asesor, {
      ...createAsesorDto,
      calificacionPromedio: '0.00',
      estadoValidacion: false,
    });

    return this.asesoresRepository.save(asesor);
  }

  async findAll(filters?: { validado?: boolean; materiasIds?: number[] }) {
    const query = this.asesoresRepository
      .createQueryBuilder('asesor')
      .leftJoinAndSelect('asesor.idUsuario', 'usuario')
      .leftJoinAndSelect('asesor.materiasAsesor', 'materiasAsesor')
      .leftJoinAndSelect(
        'asesor.especializacionesAsesor',
        'especializacionesAsesor',
      );

    if (filters?.validado !== undefined) {
      query.andWhere('asesor.estadoValidacion = :validado', {
        validado: filters.validado,
      });
    }

    if (filters?.materiasIds?.length) {
      query.andWhere('materiasAsesor.idMateria IN (:...materiasIds)', {
        materiasIds: filters.materiasIds,
      });
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const asesor = await this.asesoresRepository.findOne({
      where: { idAsesor: id },
      relations: [
        'idUsuario',
        'materiasAsesor',
        'materiasAsesor.idMateria2',
        'especializacionesAsesor',
        'especializacionesAsesor.idTema2',
      ],
    });

    if (!asesor) {
      throw new NotFoundException('Asesor no encontrado');
    }

    return asesor;
  }

  async findByUserId(userId: number) {
    const asesor = await this.asesoresRepository.findOne({
      where: {
        idUsuario: { idUsuario: userId },
      },
      relations: [
        'idUsuario',
        'materiasAsesor',
        'materiasAsesor.idMateria2',
        'especializacionesAsesor',
        'especializacionesAsesor.idTema2',
      ],
    });

    if (!asesor) {
      throw new NotFoundException('Asesor no encontrado');
    }

    return asesor;
  }

  async update(id: number, updateAsesorDto: Partial<CreateAsesorDto>) {
    const asesor = await this.findOne(id);
    Object.assign(asesor, updateAsesorDto);
    return this.asesoresRepository.save(asesor);
  }

  async validar(id: number) {
    const asesor = await this.findOne(id);
    asesor.estadoValidacion = true;
    asesor.fechaValidacion = new Date();
    return this.asesoresRepository.save(asesor);
  }

  async getAsesorias(
    id: number,
    estado?: 'programada' | 'completada' | 'cancelada',
  ) {
    const query = this.asesoresRepository
      .createQueryBuilder('asesor')
      .leftJoinAndSelect('asesor.asesorias', 'asesoria')
      .where('asesor.idAsesor = :id', { id });

    if (estado) {
      query.andWhere('asesoria.estado = :estado', { estado });
    }

    return (await query.getOne())?.asesorias || [];
  }

  async actualizarCalificacion(id: number) {
    const asesor = await this.findOne(id);
    const asesorias = await asesor.asesorias;

    const asesoriasCompletadas = asesorias.filter(
      (a) => a.estado === 'completada',
    );
    if (asesoriasCompletadas.length === 0) {
      return asesor;
    }

    // Aquí iría la lógica para calcular la calificación promedio
    // basada en las calificaciones de las asesorías

    return this.asesoresRepository.save(asesor);
  }

  async getMaterias(id: number) {
    const asesor = await this.findOne(id);
    return (await asesor.materiasAsesor).map((ma) => ma.idMateria2);
  }

  async getEspecializaciones(id: number) {
    const asesor = await this.findOne(id);
    return asesor.especializacionesAsesor;
  }
}
