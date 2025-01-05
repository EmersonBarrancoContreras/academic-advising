import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Colegios } from '../entities/colegios.entity';
import { CreateColegioDto } from './dto/create-colegio.dto';

@Injectable()
export class ColegiosService {
  constructor(
    @InjectRepository(Colegios)
    private colegiosRepository: Repository<Colegios>,
  ) {}

  async create(createColegioDto: CreateColegioDto) {
    // Verificar si ya existe un colegio con el mismo nombre en la misma ciudad
    const existingColegio = await this.colegiosRepository.findOne({
      where: {
        nombre: createColegioDto.nombre,
        ciudad: createColegioDto.ciudad,
      },
    });

    if (existingColegio) {
      throw new ConflictException(
        'Ya existe un colegio con este nombre en esta ciudad',
      );
    }

    const colegio = new Colegios();
    Object.assign(colegio, {
      ...createColegioDto,
      fechaRegistro: new Date(),
    });

    return this.colegiosRepository.save(colegio);
  }

  async findAll() {
    return this.colegiosRepository.find({
      relations: ['estudiantes'],
    });
  }

  async findOne(id: number) {
    const colegio = await this.colegiosRepository.findOne({
      where: { idColegio: id },
      relations: ['estudiantes'],
    });

    if (!colegio) {
      throw new NotFoundException('Colegio no encontrado');
    }

    return colegio;
  }

  async update(id: number, updateColegioDto: Partial<CreateColegioDto>) {
    const colegio = await this.findOne(id);

    // Verificar si el nuevo nombre ya existe en la ciudad
    if (updateColegioDto.nombre || updateColegioDto.ciudad) {
      const existingColegio = await this.colegiosRepository.findOne({
        where: {
          nombre: updateColegioDto.nombre || colegio.nombre,
          ciudad: updateColegioDto.ciudad || colegio.ciudad,
          idColegio: Not(id),
        },
      });

      if (existingColegio) {
        throw new ConflictException(
          'Ya existe un colegio con este nombre en esta ciudad',
        );
      }
    }

    Object.assign(colegio, updateColegioDto);
    return this.colegiosRepository.save(colegio);
  }

  async remove(id: number) {
    const colegio = await this.findOne(id);
    return this.colegiosRepository.remove(colegio);
  }

  async findByCity(ciudad: string) {
    return this.colegiosRepository.find({
      where: { ciudad },
    });
  }

  async getEstudiantes(id: number) {
    const colegio = await this.colegiosRepository.findOne({
      where: { idColegio: id },
      relations: ['estudiantes', 'estudiantes.idUsuario'],
    });

    if (!colegio) {
      throw new NotFoundException('Colegio no encontrado');
    }

    return colegio.estudiantes;
  }
}
