// src/notificaciones/notificaciones.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { NotificacionesService } from './notification.service';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Get()
  @Roles('administrador', 'estudiante', 'asesor')
  findAll(@GetUser() user: any) {
    return this.notificacionesService.findAll(user.id);
  }

  @Get('no-leidas')
  @Roles('administrador', 'estudiante', 'asesor')
  getNoLeidas(@GetUser() user: any) {
    return this.notificacionesService.getNoLeidas(user.id);
  }

  @Post(':id/marcar-leida')
  @Roles('administrador', 'estudiante', 'asesor')
  marcarComoLeida(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.marcarComoLeida(id);
  }

  @Post('marcar-todas-leidas')
  @Roles('administrador', 'estudiante', 'asesor')
  marcarTodasComoLeidas(@GetUser() user: any) {
    return this.notificacionesService.marcarTodasComoLeidas(user.id);
  }

  @Delete(':id')
  @Roles('administrador', 'estudiante', 'asesor')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.eliminar(id);
  }
}
