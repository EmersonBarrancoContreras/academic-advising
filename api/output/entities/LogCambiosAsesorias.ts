import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";

@Index("log_cambios_asesorias_pkey", ["idLog"], { unique: true })
@Entity("log_cambios_asesorias", { schema: "public" })
export class LogCambiosAsesorias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("character varying", {
    name: "estado_anterior",
    nullable: true,
    length: 50,
  })
  estadoAnterior: string | null;

  @Column("character varying", {
    name: "estado_nuevo",
    nullable: true,
    length: 50,
  })
  estadoNuevo: string | null;

  @Column("text", { name: "motivo_cambio", nullable: true })
  motivoCambio: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_cambio",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCambio: Date;

  @Column("text", { name: "usuario_cambio" })
  usuarioCambio: string;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.logCambiosAsesorias)
  @JoinColumn([{ name: "id_asesoria", referencedColumnName: "idAsesoria" }])
  idAsesoria: Asesorias;
}
