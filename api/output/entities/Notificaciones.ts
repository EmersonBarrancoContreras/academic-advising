import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";

@Index("notificaciones_pkey", ["idNotificacion"], { unique: true })
@Entity("notificaciones", { schema: "public" })
export class Notificaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_notificacion" })
  idNotificacion: number;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("text", { name: "mensaje" })
  mensaje: string;

  @Column("boolean", { name: "leida", nullable: true, default: () => "false" })
  leida: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.notificaciones, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuarios;
}
