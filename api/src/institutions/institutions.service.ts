import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {} from './dto/institution-response.dto';
import { Universidades } from 'src/entities/universidades.entity';
import { Colegios } from 'src/entities/colegios.entity';
import { ColegioDto } from './dto/colegio.dto';
import { UniversidadDto } from './dto/universidad.dto';
import { FilterInstitucionesDto } from './dto/filter-instituciones.dto';
import { InstitucionResponseDto } from './dto/institution-response.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Universidades)
    private universidadesRepository: Repository<Universidades>,
    @InjectRepository(Colegios)
    private colegiosRepository: Repository<Colegios>,
  ) {}

  async obtenerInstitucionesEducativas(
    filterDto?: FilterInstitucionesDto,
  ): Promise<InstitucionResponseDto> {
    try {
      const universidadesQuery = this.universidadesRepository
        .createQueryBuilder('universidad')
        .leftJoinAndSelect('universidad.sedesUniversitarias', 'sedes')
        .leftJoinAndSelect('universidad.carreras', 'carreras');

      const colegiosQuery =
        this.colegiosRepository.createQueryBuilder('colegio');

      // Aplicar filtros si existen
      if (filterDto?.ciudad) {
        universidadesQuery.andWhere('universidad.ciudad = :ciudad', {
          ciudad: filterDto.ciudad,
        });
        colegiosQuery.andWhere('colegio.ciudad = :ciudad', {
          ciudad: filterDto.ciudad,
        });
      }

      if (filterDto?.activas) {
        universidadesQuery.andWhere('universidad.activa = :activa', {
          activa: true,
        });
      }

      const [universidades, colegios] = await Promise.all([
        filterDto?.tipo !== 'colegio' ? universidadesQuery.getMany() : [],
        filterDto?.tipo !== 'universidad' ? colegiosQuery.getMany() : [],
      ]);

      const response: InstitucionResponseDto = {
        universidades: await Promise.all(
          universidades.map(this.mapUniversidadToDto),
        ),
        colegios: await Promise.all(colegios.map(this.mapColegioToDto)),
      };

      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener las instituciones educativas',
      );
    }
  }

  private async mapUniversidadToDto(
    universidad: Universidades,
  ): Promise<UniversidadDto> {
    return {
      idUniversidad: universidad.idUniversidad,
      nombre: universidad.nombre,
      ciudad: universidad.ciudad,
      direccion: universidad.direccion,
      sitioWeb: universidad.sitioWeb,
      telefono: universidad.telefono,
      pais: universidad.pais,
      activa: universidad.activa,
      sedes: (await universidad.sedesUniversitarias)
        .filter((sede) => sede.activa)
        .map((sede) => ({
          id: sede.idSede,
          nombre: sede.nombre,
          ciudad: sede.ciudad,
          direccion: sede.direccion,
          activa: sede.activa,
        })),
      carreras: (await universidad.carreras).map((carrera) => ({
        id: carrera.idCarrera,
        nombre: carrera.nombre,
        numeroSemestres: carrera.numeroSemestres,
        descripcion: carrera.descripcion,
      })),
    };
  }

  private async mapColegioToDto(colegio: Colegios): Promise<ColegioDto> {
    return {
      id: colegio.idColegio,
      tipo: 'colegio',
      nombre: colegio.nombre,
      ciudad: colegio.ciudad,
      direccion: colegio.direccion,
      fechaRegistro: colegio.fechaRegistro,
    };
  }
}
