import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";

@Index("log_validaciones_asesor_pkey", ["idLog"], { unique: true })
@Entity("log_validaciones_asesor", { schema: "public" })
export class LogValidacionesAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("boolean", { name: "estado_anterior", nullable: true })
  estadoAnterior: boolean | null;

  @Column("boolean", { name: "estado_nuevo", nullable: true })
  estadoNuevo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_validacion",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaValidacion: Date;

  @Column("text", { name: "usuario_validador" })
  usuarioValidador: string;

  @Column("text", { name: "comentarios", nullable: true })
  comentarios: string | null;

  @Column("jsonb", { name: "documentos_revisados", nullable: true })
  documentosRevisados: object | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.logValidacionesAsesors)
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;
}
