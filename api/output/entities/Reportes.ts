import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";
import { Usuarios } from "./Usuarios";

@Index("reportes_pkey", ["idReporte"], { unique: true })
@Entity("reportes", { schema: "public" })
export class Reportes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_reporte" })
  idReporte: number;

  @Column("character varying", { name: "tipo_reporte", length: 50 })
  tipoReporte: string;

  @Column("text", { name: "descripcion" })
  descripcion: string;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 50,
    default: () => "'pendiente'",
  })
  estado: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_reporte",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaReporte: Date | null;

  @Column("timestamp without time zone", {
    name: "fecha_resolucion",
    nullable: true,
  })
  fechaResolucion: Date | null;

  @Column("text", { name: "resolucion", nullable: true })
  resolucion: string | null;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.reportes)
  @JoinColumn([{ name: "id_asesoria", referencedColumnName: "idAsesoria" }])
  idAsesoria: Asesorias;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.reportes)
  @JoinColumn([
    { name: "id_usuario_reportante", referencedColumnName: "idUsuario" },
  ])
  idUsuarioReportante: Usuarios;
}
