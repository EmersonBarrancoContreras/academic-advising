import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";
import { Estudiantes } from "./Estudiantes";
import { Materias } from "./Materias";
import { Evaluaciones } from "./Evaluaciones";
import { LogCambiosAsesorias } from "./LogCambiosAsesorias";
import { PagosAsesoria } from "./PagosAsesoria";
import { RecursosEducativos } from "./RecursosEducativos";
import { Reportes } from "./Reportes";

@Index("idx_asesorias_estado", ["estado"], {})
@Index("idx_asesorias_fecha", ["fechaHoraInicio"], {})
@Index("asesorias_pkey", ["idAsesoria"], { unique: true })
@Entity("asesorias", { schema: "public" })
export class Asesorias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_asesoria" })
  idAsesoria: number;

  @Column("timestamp without time zone", { name: "fecha_hora_inicio" })
  fechaHoraInicio: Date;

  @Column("timestamp without time zone", { name: "fecha_hora_fin" })
  fechaHoraFin: Date;

  @Column("enum", {
    name: "estado",
    enum: ["programada", "completada", "cancelada"],
  })
  estado: "programada" | "completada" | "cancelada";

  @Column("character varying", {
    name: "link_videoconferencia",
    nullable: true,
    length: 255,
  })
  linkVideoconferencia: string | null;

  @Column("text", { name: "notas", nullable: true })
  notas: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @Column("numeric", { name: "costo", nullable: true, precision: 10, scale: 2 })
  costo: string | null;

  @Column("character varying", {
    name: "modalidad",
    nullable: true,
    length: 50,
  })
  modalidad: string | null;

  @Column("character varying", {
    name: "url_grabacion",
    nullable: true,
    length: 255,
  })
  urlGrabacion: string | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.asesorias, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;

  @ManyToOne(() => Estudiantes, (estudiantes) => estudiantes.asesorias, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiantes;

  @ManyToOne(() => Materias, (materias) => materias.asesorias, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria: Materias;

  @OneToOne(() => Evaluaciones, (evaluaciones) => evaluaciones.idAsesoria2)
  evaluaciones: Evaluaciones;

  @OneToMany(
    () => LogCambiosAsesorias,
    (logCambiosAsesorias) => logCambiosAsesorias.idAsesoria
  )
  logCambiosAsesorias: LogCambiosAsesorias[];

  @OneToMany(() => PagosAsesoria, (pagosAsesoria) => pagosAsesoria.idAsesoria)
  pagosAsesorias: PagosAsesoria[];

  @OneToMany(
    () => RecursosEducativos,
    (recursosEducativos) => recursosEducativos.idAsesoria
  )
  recursosEducativos: RecursosEducativos[];

  @OneToMany(() => Reportes, (reportes) => reportes.idAsesoria)
  reportes: Reportes[];
}
