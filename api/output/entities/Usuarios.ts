import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";
import { CertificacionesAsesor } from "./CertificacionesAsesor";
import { Estudiantes } from "./Estudiantes";
import { MaterialDidactico } from "./MaterialDidactico";
import { Notificaciones } from "./Notificaciones";
import { RefreshTokens } from "./RefreshTokens";
import { Reportes } from "./Reportes";

@Index("usuarios_email_unique", ["email"], { unique: true })
@Index("usuarios_pkey", ["idUsuario"], { unique: true })
@Index("idx_usuarios_rol", ["rol"], {})
@Entity("usuarios", { schema: "public" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("character varying", { name: "apellido", length: 100 })
  apellido: string;

  @Column("enum", {
    name: "rol",
    enum: ["estudiante", "asesor", "administrador"],
  })
  rol: "estudiante" | "asesor" | "administrador";

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @OneToMany(() => Asesores, (asesores) => asesores.idUsuario)
  asesores: Asesores[];

  @OneToMany(
    () => CertificacionesAsesor,
    (certificacionesAsesor) => certificacionesAsesor.verificadoPor
  )
  certificacionesAsesors: CertificacionesAsesor[];

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idUsuario)
  estudiantes: Estudiantes[];

  @OneToMany(
    () => MaterialDidactico,
    (materialDidactico) => materialDidactico.creadoPor
  )
  materialDidacticos: MaterialDidactico[];

  @OneToMany(() => Notificaciones, (notificaciones) => notificaciones.idUsuario)
  notificaciones: Notificaciones[];

  @OneToMany(() => RefreshTokens, (refreshTokens) => refreshTokens.user)
  refreshTokens: RefreshTokens[];

  @OneToMany(() => Reportes, (reportes) => reportes.idUsuarioReportante)
  reportes: Reportes[];
}
