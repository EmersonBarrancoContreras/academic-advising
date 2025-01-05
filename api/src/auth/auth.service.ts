import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '../entities/usuarios.entity';
import { RefreshTokens } from '../entities/refreshTokens.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios)
    private usuariosRepository: Repository<Usuarios>,
    @InjectRepository(RefreshTokens)
    private refreshTokensRepository: Repository<RefreshTokens>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    rol: 'estudiante' | 'asesor' | 'administrador';
  }) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usuariosRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Crear el hash de la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    // Crear el nuevo usuario
    const newUser = this.usuariosRepository.create({
      ...registerDto,
      passwordHash,
      fechaRegistro: new Date(),
      activo: true,
    });

    // Guardar el usuario
    const savedUser = await this.usuariosRepository.save(newUser);

    // Generar tokens
    const tokens = await this.generateTokens(savedUser);

    return {
      user: {
        id: savedUser.idUsuario,
        email: savedUser.email,
        nombre: savedUser.nombre,
        apellido: savedUser.apellido,
        rol: savedUser.rol,
      },
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    // Buscar el usuario
    const user = await this.usuariosRepository.findOne({
      where: { email },
      select: [
        'idUsuario',
        'email',
        'passwordHash',
        'nombre',
        'apellido',
        'rol',
        'activo',
      ], // Especificar campos
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Generar tokens
    const tokens = await this.generateTokens(user);

    // Log para debugging
    console.log('Usuario autenticado:', {
      id: user.idUsuario,
      email: user.email,
      rol: user.rol,
    });

    return {
      user: {
        id: user.idUsuario,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    // Buscar el token de refresco
    const tokenDoc = await this.refreshTokensRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    });

    if (!tokenDoc || tokenDoc.revokedAt || new Date() > tokenDoc.expiresAt) {
      throw new UnauthorizedException('Token de refresco inválido');
    }

    // Revocar el token actual
    tokenDoc.revokedAt = new Date();
    await this.refreshTokensRepository.save(tokenDoc);

    // Generar nuevos tokens
    const tokens = await this.generateTokens(await tokenDoc.user);

    return tokens;
  }

  async logout(userId: number) {
    // Revocar todos los tokens de refresco del usuario
    await this.refreshTokensRepository.update(
      { userId, revokedAt: null },
      { revokedAt: new Date() },
    );

    return { message: 'Sesión cerrada exitosamente' };
  }

  private async generateTokens(user: Usuarios) {
    // Payload más completo para el token
    const payload = {
      sub: user.idUsuario,
      id: user.idUsuario, // Agregar explícitamente el id
      email: user.email,
      rol: user.rol,
      nombre: user.nombre,
      apellido: user.apellido,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET || 'secretKey', // Asegurar que use la misma secret key
    });

    const refreshToken = await this.createRefreshToken(user.idUsuario);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'secretKey',
      });

      console.log('Token verificado:', payload); // Log para debugging

      return payload;
    } catch (error) {
      console.error('Error verificando token:', error);
      throw new UnauthorizedException('Token inválido');
    }
  }

  private async createRefreshToken(userId: number): Promise<string> {
    // Crear un token de refresco aleatorio
    const token = this.generateRandomToken();

    // Guardar el token en la base de datos
    const refreshToken = this.refreshTokensRepository.create({
      userId,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expira en 7 días
      createdAt: new Date(),
    });

    await this.refreshTokensRepository.save(refreshToken);

    return token;
  }

  private generateRandomToken(): string {
    return require('crypto').randomBytes(40).toString('hex');
  }

  async validateUser(email: string, password: string) {
    const user = await this.usuariosRepository.findOne({
      where: { email },
      select: [
        'idUsuario',
        'email',
        'passwordHash',
        'nombre',
        'apellido',
        'rol',
        'activo',
      ],
    });

    if (!user) {
      console.log('Usuario no encontrado:', email);
      return null;
    }

    if (!user.activo) {
      console.log('Usuario inactivo:', email);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      console.log('Contraseña inválida para usuario:', email);
      return null;
    }

    const { passwordHash, ...result } = user;
    console.log('Usuario validado:', result);
    return result;
  }
}
