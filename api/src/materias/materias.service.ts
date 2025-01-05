import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materias } from '../entities/materias.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriasService {
  constructor(
    @InjectRepository(Materias)
    private materiasRepository: Repository<Materias>,
  ) {}

  async create(createMateriaDto: CreateMateriaDto) {
    // Verificar si el código ya existe
    const existingMateria = await this.materiasRepository.findOne({
      where: { codigo: createMateriaDto.codigo },
    });

    if (existingMateria) {
      throw new ConflictException('Ya existe una materia con este código');
    }

    const materia = new Materias();
    Object.assign(materia, {
      ...createMateriaDto,
      calificacionPromedio: '0.00',
      tasaAprobacion: '0.00',
      fechaCreacion: new Date(),
    });

    return this.materiasRepository.save(materia);
  }

  async findAll(filters?: {
    nivelAcademico?: string;
    idCarrera?: number;
    activa?: boolean;
  }) {
    const query = this.materiasRepository.createQueryBuilder('materia');

    if (filters?.nivelAcademico) {
      query.andWhere('materia.nivelAcademico = :nivelAcademico', {
        nivelAcademico: filters.nivelAcademico,
      });
    }

    if (filters?.idCarrera) {
      query.andWhere('materia.idCarrera = :idCarrera', {
        idCarrera: filters.idCarrera,
      });
    }

    if (filters?.activa !== undefined) {
      query.andWhere('materia.activa = :activa', {
        activa: filters.activa,
      });
    }

    // Ajustamos las relaciones según tu entidad
    return query
      .leftJoinAndSelect('materia.idCarrera2', 'carrera')
      .leftJoinAndSelect('materia.prerequisitosMateria', 'prerequisitosMateria')
      .leftJoinAndSelect(
        'materia.prerequisitosMateria2',
        'prerequisitosMateria2',
      )
      .leftJoinAndSelect('materia.recursosMateria', 'recursosMateria')
      .leftJoinAndSelect('materia.temasMateria', 'temasMateria')
      .getMany();
  }

  async findOne(id: number) {
    const materia = await this.materiasRepository.findOne({
      where: { idMateria: id },
      relations: [
        'idCarrera2',
        'prerequisitosMateria',
        'prerequisitosMateria2',
        'recursosMateria',
        'temasMateria',
      ],
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    return materia;
  }
  async update(id: number, updateMateriaDto: Partial<CreateMateriaDto>) {
    const materia = await this.findOne(id);

    if (updateMateriaDto.codigo && updateMateriaDto.codigo !== materia.codigo) {
      const existingMateria = await this.materiasRepository.findOne({
        where: { codigo: updateMateriaDto.codigo },
      });

      if (existingMateria) {
        throw new ConflictException('Ya existe una materia con este código');
      }
    }

    Object.assign(materia, updateMateriaDto);
    return this.materiasRepository.save(materia);
  }

  async remove(id: number) {
    const materia = await this.findOne(id);
    return this.materiasRepository.remove(materia);
  }

  // Para obtener los prerequisitos de una materia
  async getPrerequisitos(id: number) {
    const materia = await this.materiasRepository.findOne({
      where: { idMateria: id },
      relations: [
        'prerequisitosMateria',
        'prerequisitosMateria.idPrerequisito2',
      ],
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    // Mapeamos los prerequisitos según tu estructura
    return (await materia.prerequisitosMateria).map((p) => p.idPrerequisito2);
  }

  async getRecursos(id: number) {
    const materia = await this.materiasRepository.findOne({
      where: { idMateria: id },
      relations: ['recursosMateria'],
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    return materia.recursosMateria;
  }

  async getTemas(id: number) {
    const materia = await this.materiasRepository.findOne({
      where: { idMateria: id },
      relations: ['temasMateria'],
    });

    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    return materia.temasMateria;
  }
}
