import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Pagos } from '../entities/pagos.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pagos)
    private pagosRepository: Repository<Pagos>,
  ) {}

  async create(createPagoDto: CreatePagoDto) {
    // Verificar si ya existe un pago para esta asesoría
    const existingPago = await this.pagosRepository.findOne({
      where: {
        idAsesoria: { idAsesoria: createPagoDto.idAsesoria },
      },
    });

    if (existingPago) {
      throw new ConflictException('Ya existe un pago para esta asesoría');
    }

    const pago = new Pagos();
    pago.monto = createPagoDto.monto.toString();
    pago.estado = createPagoDto.estado;
    pago.metodoPago = createPagoDto.metodoPago;
    pago.referenciaPago = createPagoDto.referenciaPago;
    pago.fechaCreacion = new Date();

    if (createPagoDto.estado === 'pagado') {
      pago.fechaPago = new Date();
    }

    pago.idAsesoria = Promise.resolve({
      idAsesoria: createPagoDto.idAsesoria,
    } as any);
    pago.idEstudiante = Promise.resolve({
      idEstudiante: createPagoDto.idEstudiante,
    } as any);

    return this.pagosRepository.save(pago);
  }

  async findAll(filters?: {
    estado?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    idEstudiante?: number;
  }) {
    const query = this.pagosRepository
      .createQueryBuilder('pago')
      .leftJoinAndSelect('pago.idAsesoria', 'asesoria')
      .leftJoinAndSelect('pago.idEstudiante', 'estudiante');

    if (filters?.estado) {
      query.andWhere('pago.estado = :estado', { estado: filters.estado });
    }

    if (filters?.fechaInicio && filters?.fechaFin) {
      query.andWhere('pago.fechaCreacion BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio: filters.fechaInicio,
        fechaFin: filters.fechaFin,
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
    const pago = await this.pagosRepository.findOne({
      where: { idPago: id },
      relations: ['idAsesoria', 'idEstudiante'],
    });

    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }

    return pago;
  }

  async cambiarEstado(
    id: number,
    estado: 'pendiente' | 'pagado' | 'cancelado' | 'reembolsado',
  ) {
    const pago = await this.findOne(id);
    pago.estado = estado;

    if (estado === 'pagado') {
      pago.fechaPago = new Date();
    }

    return this.pagosRepository.save(pago);
  }

  async getPagosEstudiante(idEstudiante: number) {
    return this.pagosRepository.find({
      where: { idEstudiante: { idEstudiante } },
      relations: ['idAsesoria'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async getEstadisticasPagos(fechaInicio: Date, fechaFin: Date) {
    const pagos = await this.pagosRepository.find({
      where: {
        fechaCreacion: Between(fechaInicio, fechaFin),
      },
    });

    return {
      totalPagos: pagos.length,
      montoTotal: pagos.reduce((sum, pago) => sum + Number(pago.monto), 0),
      porEstado: {
        pendiente: pagos.filter((p) => p.estado === 'pendiente').length,
        pagado: pagos.filter((p) => p.estado === 'pagado').length,
        cancelado: pagos.filter((p) => p.estado === 'cancelado').length,
        reembolsado: pagos.filter((p) => p.estado === 'reembolsado').length,
      },
    };
  }
}
