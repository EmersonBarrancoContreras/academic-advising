// src/notificaciones/notificaciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificaciones } from '../entities/notificaciones.entity';
import { CreateNotificacionDto } from './dto/create-notification.dto';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificaciones)
    private notificacionesRepository: Repository<Notificaciones>,
  ) {}

  async create(createNotificacionDto: CreateNotificacionDto) {
    // Creamos una nueva instancia de Notificaciones
    const notificacion = new Notificaciones();

    // Asignamos los valores básicos
    notificacion.titulo = createNotificacionDto.titulo;
    notificacion.mensaje = createNotificacionDto.mensaje;
    notificacion.tipo = createNotificacionDto.tipo;
    notificacion.leida = false;
    notificacion.fechaCreacion = new Date();

    // Asignamos la relación con el usuario
    notificacion.idUsuario = Promise.resolve({
      idUsuario: createNotificacionDto.idUsuario,
    } as any);

    // Guardamos y retornamos
    return this.notificacionesRepository.save(notificacion);
  }

  async findAll(idUsuario: number) {
    return this.notificacionesRepository
      .createQueryBuilder('notificacion')
      .where('notificacion.id_usuario = :idUsuario', { idUsuario })
      .orderBy('notificacion.fecha_creacion', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionesRepository.findOne({
      where: { idNotificacion: id },
    });

    if (!notificacion) {
      throw new NotFoundException('Notificación no encontrada');
    }

    return notificacion;
  }

  async getNoLeidas(idUsuario: number) {
    return this.notificacionesRepository
      .createQueryBuilder('notificacion')
      .where('notificacion.id_usuario = :idUsuario', { idUsuario })
      .andWhere('notificacion.leida = :leida', { leida: false })
      .orderBy('notificacion.fecha_creacion', 'DESC')
      .getMany();
  }

  async marcarComoLeida(id: number) {
    const notificacion = await this.findOne(id);
    notificacion.leida = true;
    notificacion.fechaLectura = new Date();
    return this.notificacionesRepository.save(notificacion);
  }

  async marcarTodasComoLeidas(idUsuario: number) {
    await this.notificacionesRepository
      .createQueryBuilder()
      .update(Notificaciones)
      .set({ leida: true, fechaLectura: new Date() })
      .where('id_usuario = :idUsuario', { idUsuario })
      .andWhere('leida = :leida', { leida: false })
      .execute();
  }

  async eliminar(id: number) {
    const notificacion = await this.findOne(id);
    return this.notificacionesRepository.remove(notificacion);
  }

  // Método para notificar sobre asesorías
  async crearNotificacionAsesoria(idUsuario: number, asesoria: any) {
    const notificacion = new Notificaciones();
    notificacion.titulo = 'Nueva asesoría programada';
    notificacion.mensaje = `Tienes una nueva asesoría programada para ${asesoria.fechaHoraInicio}`;
    notificacion.tipo = 'asesoria';
    notificacion.leida = false;
    notificacion.fechaCreacion = new Date();
    notificacion.idUsuario = Promise.resolve({ idUsuario } as any);

    return this.notificacionesRepository.save(notificacion);
  }

  // Método para notificar sobre pagos
  async crearNotificacionPago(idUsuario: number, pago: any) {
    const notificacion = new Notificaciones();
    notificacion.titulo = 'Pago registrado';
    notificacion.mensaje = `Se ha registrado un nuevo pago por $${pago.monto}`;
    notificacion.tipo = 'pago';
    notificacion.leida = false;
    notificacion.fechaCreacion = new Date();
    notificacion.idUsuario = Promise.resolve({ idUsuario } as any);

    return this.notificacionesRepository.save(notificacion);
  }

  // Método para recordatorios
  async crearNotificacionRecordatorio(idUsuario: number, asesoria: any) {
    const notificacion = new Notificaciones();
    notificacion.titulo = 'Recordatorio de asesoría';
    notificacion.mensaje = 'Tu asesoría está programada para dentro de 1 hora';
    notificacion.tipo = 'recordatorio';
    notificacion.leida = false;
    notificacion.fechaCreacion = new Date();
    notificacion.idUsuario = Promise.resolve({ idUsuario } as any);

    return this.notificacionesRepository.save(notificacion);
  }

  // Método para notificaciones del sistema
  async crearNotificacionSistema(idUsuario: number, mensaje: string) {
    const notificacion = new Notificaciones();
    notificacion.titulo = 'Notificación del sistema';
    notificacion.mensaje = mensaje;
    notificacion.tipo = 'sistema';
    notificacion.leida = false;
    notificacion.fechaCreacion = new Date();
    notificacion.idUsuario = Promise.resolve({ idUsuario } as any);

    return this.notificacionesRepository.save(notificacion);
  }

  // Método para obtener conteo de notificaciones no leídas
  async getConteoNoLeidas(idUsuario: number) {
    return this.notificacionesRepository.count({
      where: {
        idUsuario: { idUsuario },
        leida: false,
      },
    });
  }

  // Método para obtener últimas notificaciones
  async getUltimasNotificaciones(idUsuario: number, limit: number = 5) {
    return this.notificacionesRepository
      .createQueryBuilder('notificacion')
      .where('notificacion.id_usuario = :idUsuario', { idUsuario })
      .orderBy('notificacion.fecha_creacion', 'DESC')
      .limit(limit)
      .getMany();
  }
}
