import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("log_accesos_pkey", ["idLog"], { unique: true })
@Entity("log_accesos", { schema: "public" })
export class LogAccesos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("timestamp without time zone", {
    name: "fecha_hora",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaHora: Date;

  @Column("character varying", { name: "ip_origen", length: 45 })
  ipOrigen: string;

  @Column("text", { name: "usuario" })
  usuario: string;

  @Column("character varying", { name: "tipo_accion", length: 50 })
  tipoAccion: string;

  @Column("character varying", { name: "resultado", length: 20 })
  resultado: string;

  @Column("jsonb", { name: "detalles", nullable: true })
  detalles: object | null;
}
