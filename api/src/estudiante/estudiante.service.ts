import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, ILike } from 'typeorm';
import { Estudiantes } from '../entities/estudiantes.entity';
import { Usuarios } from '../entities/usuarios.entity';
import { Carreras } from '../entities/carreras.entity';
import { Colegios } from '../entities/colegios.entity';
import { SedesUniversitarias } from '../entities/sedesUniversitarias.entity';
import { Asesorias } from '../entities/asesorias.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PaginationDto } from './/dto/pagination.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiantes)
    private estudiantesRepository: Repository<Estudiantes>,
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
    @InjectRepository(Carreras)
    private carrerasRepository: Repository<Carreras>,
    @InjectRepository(Colegios)
    private colegiosRepository: Repository<Colegios>,
    @InjectRepository(SedesUniversitarias)
    private sedesRepository: Repository<SedesUniversitarias>,
    @InjectRepository(Asesorias)
    private asesoriasRepository: Repository<Asesorias>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    // Verificar si el usuario existe y es de tipo estudiante
    const usuario = await this.usuariosRepository.findOne({
      where: { idUsuario: createEstudianteDto.idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (usuario.rol !== 'estudiante') {
      throw new ConflictException('El usuario debe tener rol de estudiante');
    }

    // Verificar si ya existe un estudiante para este usuario
    const estudianteExistente = await this.estudiantesRepository.findOne({
      where: { idUsuario: usuario },
    });

    if (estudianteExistente) {
      throw new ConflictException(
        'El usuario ya tiene un perfil de estudiante',
      );
    }

    // Crear el objeto estudiante con las relaciones
    const estudiante = new Estudiantes();
    estudiante.nivelAcademico = createEstudianteDto.nivelAcademico;
    estudiante.gradoActual = createEstudianteDto.gradoActual;
    estudiante.semestreActual = createEstudianteDto.semestreActual;

    // Asignar relaciones
    if (createEstudianteDto.idCarrera) {
      const carrera = await this.carrerasRepository.findOne({
        where: { idCarrera: createEstudianteDto.idCarrera },
      });
      if (!carrera) {
        throw new NotFoundException('Carrera no encontrada');
      }
      estudiante.idCarrera = Promise.resolve(carrera);
    }

    if (createEstudianteDto.idColegio) {
      const colegio = await this.colegiosRepository.findOne({
        where: { idColegio: createEstudianteDto.idColegio },
      });
      if (!colegio) {
        throw new NotFoundException('Colegio no encontrado');
      }
      estudiante.idColegio = Promise.resolve(colegio);
    }

    if (createEstudianteDto.idSede) {
      const sede = await this.sedesRepository.findOne({
        where: { idSede: createEstudianteDto.idSede },
      });
      if (!sede) {
        throw new NotFoundException('Sede no encontrada');
      }
      estudiante.idSede = Promise.resolve(sede);
    }

    estudiante.idUsuario = Promise.resolve(usuario);

    // Validaciones según el nivel académico
    if (createEstudianteDto.nivelAcademico === 'universitario') {
      if (!createEstudianteDto.idCarrera || !createEstudianteDto.idSede) {
        throw new ConflictException(
          'Estudiantes universitarios requieren carrera y sede',
        );
      }
    } else {
      if (!createEstudianteDto.idColegio) {
        throw new ConflictException(
          'Estudiantes de primaria/secundaria requieren colegio',
        );
      }
    }

    // Guardar el estudiante
    return this.estudiantesRepository.save(estudiante);
  }

  async findAll(paginationDto: PaginationDto) {
    const {
      limit = 10,
      offset = 0,
      search = '',
      nivelAcademico,
    } = paginationDto;

    const queryBuilder = this.estudiantesRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.idUsuario', 'usuario')
      .leftJoinAndSelect('estudiante.idCarrera', 'carrera')
      .leftJoinAndSelect('estudiante.idColegio', 'colegio')
      .leftJoinAndSelect('estudiante.idSede', 'sede')
      .take(limit)
      .skip(offset);

    if (search) {
      queryBuilder.andWhere(
        'usuario.nombre ILIKE :search OR usuario.apellido ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (nivelAcademico) {
      queryBuilder.andWhere('estudiante.nivelAcademico = :nivelAcademico', {
        nivelAcademico,
      });
    }

    const [estudiantes, total] = await queryBuilder.getManyAndCount();

    return {
      estudiantes,
      total,
    };
  }

  async findOne(id: number) {
    const estudiante = await this.estudiantesRepository.findOne({
      where: { idEstudiante: id },
      relations: [
        'idUsuario',
        'idCarrera',
        'idColegio',
        'idSede',
        'asesorias',
        'asesorias.idMateria',
        'asesorias.idAsesor',
      ],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return estudiante;
  }

  async findByUserId(userId: number) {
    const estudiante = await this.estudiantesRepository.findOne({
      where: { idUsuario: { idUsuario: userId } },
      relations: [
        'idUsuario',
        'idCarrera',
        'idColegio',
        'idSede',
        'asesorias',
        'asesorias.idMateria',
        'asesorias.idAsesor',
      ],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudiantesRepository.findOne({
      where: { idEstudiante: id },
      relations: ['idUsuario', 'idCarrera', 'idColegio', 'idSede'],
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    if (updateEstudianteDto.nivelAcademico) {
      estudiante.nivelAcademico = updateEstudianteDto.nivelAcademico;
    }

    if (updateEstudianteDto.gradoActual !== undefined) {
      estudiante.gradoActual = updateEstudianteDto.gradoActual;
    }

    if (updateEstudianteDto.semestreActual !== undefined) {
      estudiante.semestreActual = updateEstudianteDto.semestreActual;
    }

    if (updateEstudianteDto.idCarrera) {
      const carrera = await this.carrerasRepository.findOne({
        where: { idCarrera: updateEstudianteDto.idCarrera },
      });
      if (!carrera) {
        throw new NotFoundException('Carrera no encontrada');
      }
      estudiante.idCarrera = Promise.resolve(carrera);
    }

    if (updateEstudianteDto.idColegio) {
      const colegio = await this.colegiosRepository.findOne({
        where: { idColegio: updateEstudianteDto.idColegio },
      });
      if (!colegio) {
        throw new NotFoundException('Colegio no encontrado');
      }
      estudiante.idColegio = Promise.resolve(colegio);
    }

    if (updateEstudianteDto.idSede) {
      const sede = await this.sedesRepository.findOne({
        where: { idSede: updateEstudianteDto.idSede },
      });
      if (!sede) {
        throw new NotFoundException('Sede no encontrada');
      }
      estudiante.idSede = Promise.resolve(sede);
    }

    // Validaciones según el nivel académico
    if (estudiante.nivelAcademico === 'universitario') {
      if (!(await estudiante.idCarrera) || !(await estudiante.idSede)) {
        throw new ConflictException(
          'Estudiantes universitarios requieren carrera y sede',
        );
      }
    } else {
      if (!(await estudiante.idColegio)) {
        throw new ConflictException(
          'Estudiantes de primaria/secundaria requieren colegio',
        );
      }
    }

    return this.estudiantesRepository.save(estudiante);
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);
    await this.estudiantesRepository.remove(estudiante);
    return { message: 'Estudiante eliminado correctamente' };
  }

  async getAsesoriasEstudiante(
    id: number,
    estado?: 'programada' | 'completada' | 'cancelada',
  ) {
    const estudiante = await this.estudiantesRepository.findOne({
      where: { idEstudiante: id },
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    const queryBuilder = this.asesoriasRepository
      .createQueryBuilder('asesoria')
      .where('asesoria.idEstudiante = :idEstudiante', { idEstudiante: id })
      .leftJoinAndSelect('asesoria.idMateria', 'materia')
      .leftJoinAndSelect('asesoria.idAsesor', 'asesor')
      .leftJoinAndSelect('asesor.idUsuario', 'usuario')
      .orderBy('asesoria.fechaHoraInicio', 'DESC');

    if (estado) {
      queryBuilder.andWhere('asesoria.estado = :estado', { estado });
    }

    return queryBuilder.getMany();
  }

  async getEstadisticasEstudiante(id: number) {
    const estudiante = await this.findOne(id);
    const asesorias = await estudiante.asesorias;

    const asesoriasCompletadas = asesorias.filter(
      (a) => a.estado === 'completada',
    );
    const horasTotales = asesoriasCompletadas.reduce((total, asesoria) => {
      const duracion =
        (asesoria.fechaHoraFin.getTime() - asesoria.fechaHoraInicio.getTime()) /
        (1000 * 60 * 60);
      return total + duracion;
    }, 0);

    return {
      totalAsesorias: asesorias.length,
      asesoriasCompletadas: asesoriasCompletadas.length,
      asesoriasCanceladas: asesorias.filter((a) => a.estado === 'cancelada')
        .length,
      asesoriasProgramadas: asesorias.filter((a) => a.estado === 'programada')
        .length,
      horasTotales: Number(horasTotales.toFixed(2)),
      promedioHorasPorMes: Number(
        (horasTotales / (asesorias.length || 1)).toFixed(2),
      ),
    };
  }

  async getAsesoriasProximasEstudiante(id: number) {
    const estudiante = await this.findOne(id);
    const ahora = new Date();

    return this.asesoriasRepository.find({
      where: {
        idEstudiante: estudiante,
        estado: 'programada',
        fechaHoraInicio: Between(
          ahora,
          new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000),
        ), // próximos 7 días
      },
      relations: ['idMateria', 'idAsesor', 'idAsesor.idUsuario'],
      order: {
        fechaHoraInicio: 'ASC',
      },
    });
  }

  async buscarEstudiantesPorNombre(
    nombre: string,
    paginationDto: PaginationDto,
  ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const queryBuilder = this.estudiantesRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.idUsuario', 'usuario')
      .where('usuario.nombre ILIKE :nombre OR usuario.apellido ILIKE :nombre', {
        nombre: `%${nombre}%`,
      })
      .take(limit)
      .skip(offset);

    const [estudiantes, total] = await queryBuilder.getManyAndCount();

    return {
      estudiantes,
      total,
    };
  }
}
