import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("log_mantenimiento_pkey", ["idMantenimiento"], { unique: true })
@Entity("log_mantenimiento", { schema: "public" })
export class LogMantenimiento {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_mantenimiento" })
  idMantenimiento: number;

  @Column("timestamp without time zone", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("timestamp without time zone", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("character varying", { name: "tipo_mantenimiento", length: 50 })
  tipoMantenimiento: string;

  @Column("text", { name: "tabla_afectada", nullable: true })
  tablaAfectada: string | null;

  @Column("integer", { name: "registros_procesados", nullable: true })
  registrosProcesados: number | null;

  @Column("bigint", { name: "espacio_liberado", nullable: true })
  espacioLiberado: string | null;

  @Column("text", { name: "ejecutado_por" })
  ejecutadoPor: string;

  @Column("text", { name: "detalles", nullable: true })
  detalles: string | null;
}
