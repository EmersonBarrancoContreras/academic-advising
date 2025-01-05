// src/notificaciones/notificaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesController } from './notification.controller';
import { NotificacionesService } from './notification.service';
import { Notificaciones } from '../entities/notificaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificaciones])],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  exports: [NotificacionesService],
})
export class NotificacionesModule {}
