import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Carreras } from '../entities/carreras.entity';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carreras)
    private carrerasRepository: Repository<Carreras>,
  ) {}

  async create(createCarreraDto: CreateCarreraDto) {
    // Verificar si ya existe una carrera con el mismo nombre en la universidad
    const existingCarrera = await this.carrerasRepository.findOne({
      where: {
        nombre: createCarreraDto.nombre,
        idUniversidad: createCarreraDto.idUniversidad,
      },
    });

    if (existingCarrera) {
      throw new ConflictException(
        'Ya existe una carrera con este nombre en la universidad',
      );
    }

    // Crear nueva carrera
    const newCarrera = new Carreras();
    newCarrera.nombre = createCarreraDto.nombre;
    newCarrera.descripcion = createCarreraDto.descripcion;
    newCarrera.numeroSemestres = createCarreraDto.numeroSemestres;
    newCarrera.idUniversidad = createCarreraDto.idUniversidad;

    return this.carrerasRepository.save(newCarrera);
  }

  async findAll() {
    return this.carrerasRepository.find({
      relations: ['idUniversidad2'], // Ajusta según el nombre de la relación en tu entidad
    });
  }

  async findOne(id: number) {
    const carrera = await this.carrerasRepository.findOne({
      where: { idCarrera: id },
      relations: ['idUniversidad2', 'materias', 'estudiantes'], // Ajusta según los nombres de las relaciones
    });

    if (!carrera) {
      throw new NotFoundException('Carrera no encontrada');
    }

    return carrera;
  }

  async update(id: number, updateCarreraDto: UpdateCarreraDto) {
    const carrera = await this.findOne(id);

    if (updateCarreraDto.nombre && updateCarreraDto.idUniversidad) {
      const existingCarrera = await this.carrerasRepository.findOne({
        where: {
          nombre: updateCarreraDto.nombre,
          idUniversidad: updateCarreraDto.idUniversidad,
          idCarrera: Not(id), // Para excluir la carrera actual de la validación
        },
      });

      if (existingCarrera) {
        throw new ConflictException(
          'Ya existe una carrera con este nombre en la universidad',
        );
      }
    }

    // Actualizar los campos
    if (updateCarreraDto.nombre) carrera.nombre = updateCarreraDto.nombre;
    if (updateCarreraDto.descripcion)
      carrera.descripcion = updateCarreraDto.descripcion;
    if (updateCarreraDto.numeroSemestres)
      carrera.numeroSemestres = updateCarreraDto.numeroSemestres;
    if (updateCarreraDto.idUniversidad)
      carrera.idUniversidad = updateCarreraDto.idUniversidad;

    return this.carrerasRepository.save(carrera);
  }

  async findByUniversidad(idUniversidad: number) {
    return this.carrerasRepository.find({
      where: {
        idUniversidad: idUniversidad,
      },
      relations: ['estudiantes'],
    });
  }

  async remove(id: number) {
    const carrera = await this.findOne(id);
    return this.carrerasRepository.remove(carrera);
  }

  async getMaterias(id: number) {
    const carrera = await this.carrerasRepository.findOne({
      where: { idCarrera: id },
      relations: ['materias'],
    });

    if (!carrera) {
      throw new NotFoundException('Carrera no encontrada');
    }

    return carrera.materias;
  }

  async getEstudiantes(id: number) {
    const carrera = await this.carrerasRepository.findOne({
      where: { idCarrera: id },
      relations: ['estudiantes', 'estudiantes.idUsuario'],
    });

    if (!carrera) {
      throw new NotFoundException('Carrera no encontrada');
    }

    return carrera.estudiantes;
  }
}
