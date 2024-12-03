import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("log_respaldos_pkey", ["idRespaldo"], { unique: true })
@Entity("log_respaldos", { schema: "public" })
export class LogRespaldos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_respaldo" })
  idRespaldo: number;

  @Column("timestamp without time zone", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("timestamp without time zone", { name: "fecha_fin", nullable: true })
  fechaFin: Date | null;

  @Column("character varying", { name: "tipo_respaldo", length: 50 })
  tipoRespaldo: string;

  @Column("character varying", { name: "estado", length: 50 })
  estado: string;

  @Column("bigint", { name: "tamanio_bytes", nullable: true })
  tamanioBytes: string | null;

  @Column("text", { name: "ruta_archivo", nullable: true })
  rutaArchivo: string | null;

  @Column("text", { name: "hash_verificacion", nullable: true })
  hashVerificacion: string | null;

  @Column("text", { name: "ejecutado_por" })
  ejecutadoPor: string;

  @Column("text", { name: "observaciones", nullable: true })
  observaciones: string | null;
}
