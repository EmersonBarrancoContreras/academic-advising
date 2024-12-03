import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("auditoria_usuarios_pkey", ["idAuditoria"], { unique: true })
@Entity("auditoria_usuarios", { schema: "public" })
export class AuditoriaUsuarios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_auditoria" })
  idAuditoria: number;

  @Column("integer", { name: "id_usuario", nullable: true })
  idUsuario: number | null;

  @Column("character varying", { name: "accion", nullable: true, length: 50 })
  accion: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_cambio",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCambio: Date | null;

  @Column("jsonb", { name: "datos_antiguos", nullable: true })
  datosAntiguos: object | null;

  @Column("jsonb", { name: "datos_nuevos", nullable: true })
  datosNuevos: object | null;

  @Column("text", { name: "usuario_modificacion", nullable: true })
  usuarioModificacion: string | null;
}
