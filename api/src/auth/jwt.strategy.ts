import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from '../entities/usuarios.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tu_secreto_super_seguro',
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const usuario = await this.usuariosRepository.findOne({
      where: { idUsuario: id },
    });

    if (!usuario) {
      throw new UnauthorizedException('Token no válido');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario no está activo');
    }

    return {
      id: usuario.idUsuario,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
    };
  }
}
