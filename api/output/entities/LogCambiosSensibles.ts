import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("log_cambios_sensibles_pkey", ["idLog"], { unique: true })
@Entity("log_cambios_sensibles", { schema: "public" })
export class LogCambiosSensibles {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("timestamp without time zone", {
    name: "fecha_hora",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaHora: Date;

  @Column("text", { name: "usuario" })
  usuario: string;

  @Column("character varying", { name: "tipo_operacion", length: 50 })
  tipoOperacion: string;

  @Column("text", { name: "tabla_afectada" })
  tablaAfectada: string;

  @Column("integer", { name: "id_registro", nullable: true })
  idRegistro: number | null;

  @Column("jsonb", { name: "datos_antiguos", nullable: true })
  datosAntiguos: object | null;

  @Column("jsonb", { name: "datos_nuevos", nullable: true })
  datosNuevos: object | null;

  @Column("character varying", {
    name: "ip_origen",
    nullable: true,
    length: 45,
  })
  ipOrigen: string | null;

  @Column("text", { name: "aplicacion_origen", nullable: true })
  aplicacionOrigen: string | null;
}
