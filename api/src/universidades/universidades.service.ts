import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Universidades } from '../entities/universidades.entity';
import { CreateUniversidadesDto } from './dto/create-universidades.dto';

@Injectable()
export class UniversidadesService {
  constructor(
    @InjectRepository(Universidades)
    private universidadesRepository: Repository<Universidades>,
  ) {}

  async create(createUniversidadDto: CreateUniversidadesDto) {
    const existingUniversidad = await this.universidadesRepository.findOne({
      where: { nombre: createUniversidadDto.nombre },
    });

    if (existingUniversidad) {
      throw new ConflictException('Ya existe una universidad con este nombre');
    }

    const universidad = new Universidades();
    Object.assign(universidad, {
      ...createUniversidadDto,
      fechaRegistro: new Date(),
    });

    return this.universidadesRepository.save(universidad);
  }

  async findAll() {
    return this.universidadesRepository.find({
      relations: ['carreras', 'sedesUniversitarias'],
    });
  }

  async findOne(id: number) {
    const universidad = await this.universidadesRepository.findOne({
      where: { idUniversidad: id },
      relations: ['carreras', 'sedesUniversitarias', 'materias'],
    });

    if (!universidad) {
      throw new NotFoundException('Universidad no encontrada');
    }

    return universidad;
  }

  async update(
    id: number,
    updateUniversidadDto: Partial<CreateUniversidadesDto>,
  ) {
    const universidad = await this.findOne(id);

    if (updateUniversidadDto.nombre) {
      const existingUniversidad = await this.universidadesRepository.findOne({
        where: { nombre: updateUniversidadDto.nombre, idUniversidad: Not(id) },
      });

      if (existingUniversidad) {
        throw new ConflictException(
          'Ya existe una universidad con este nombre',
        );
      }
    }

    Object.assign(universidad, updateUniversidadDto);
    return this.universidadesRepository.save(universidad);
  }

  async remove(id: number) {
    const universidad = await this.findOne(id);
    return this.universidadesRepository.remove(universidad);
  }

  async getCarreras(id: number) {
    const universidad = await this.universidadesRepository.findOne({
      where: { idUniversidad: id },
      relations: ['carreras'],
    });

    if (!universidad) {
      throw new NotFoundException('Universidad no encontrada');
    }

    return universidad.carreras;
  }

  async getSedes(id: number) {
    const universidad = await this.universidadesRepository.findOne({
      where: { idUniversidad: id },
      relations: ['sedesUniversitarias'],
    });

    if (!universidad) {
      throw new NotFoundException('Universidad no encontrada');
    }

    return universidad.sedesUniversitarias;
  }

  async getMaterias(id: number) {
    const universidad = await this.universidadesRepository.findOne({
      where: { idUniversidad: id },
      relations: ['materias'],
    });

    if (!universidad) {
      throw new NotFoundException('Universidad no encontrada');
    }

    return universidad.materias;
  }

  async findByCity(ciudad: string) {
    return this.universidadesRepository.find({
      where: { ciudad },
      relations: ['sedesUniversitarias'],
    });
  }
}
