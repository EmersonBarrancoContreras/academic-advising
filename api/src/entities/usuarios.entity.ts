import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asesores } from './asesores.entity';
import { Estudiantes } from './estudiantes.entity';
import { RefreshTokens } from './refreshTokens.entity';
import { Notificaciones } from './notificaciones.entity';

@Index('usuarios_email_unique', ['email'], { unique: true })
@Index('usuarios_pkey', ['idUsuario'], { unique: true })
@Index('idx_usuarios_rol', ['rol'], {})
@Entity('usuarios', { schema: 'public' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_usuario' })
  public idUsuario: number;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  public email: string;

  @Column('character varying', { name: 'password_hash', length: 255 })
  public passwordHash: string;

  @Column('character varying', { name: 'nombre', length: 100 })
  public nombre: string;

  @Column('character varying', { name: 'apellido', length: 100 })
  public apellido: string;

  @Column('enum', {
    name: 'rol',
    enum: ['estudiante', 'asesor', 'administrador'],
  })
  public rol: 'estudiante' | 'asesor' | 'administrador';

  @Column('timestamp without time zone', {
    name: 'fecha_registro',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public fechaRegistro: Date | null;

  @Column('boolean', { name: 'activo', nullable: true, default: () => 'true' })
  public activo: boolean | null;

  @OneToMany(() => Asesores, (asesores) => asesores.idUsuario, { lazy: true })
  public asesores: Promise<Asesores[]>;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idUsuario, {
    lazy: true,
  })
  public estudiantes: Promise<Estudiantes[]>;

  @OneToMany(() => RefreshTokens, (refreshTokens) => refreshTokens.user, {
    lazy: true,
  })
  public refreshTokens: Promise<RefreshTokens[]>;

  @OneToMany(
    () => Notificaciones,
    (notificaciones) => notificaciones.idUsuario,
    {
      lazy: true,
    },
  )
  notificaciones: Promise<Notificaciones[]>;
}
