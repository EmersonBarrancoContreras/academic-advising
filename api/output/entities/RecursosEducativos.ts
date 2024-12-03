import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";
import { Materias } from "./Materias";

@Index("recursos_educativos_pkey", ["idRecurso"], { unique: true })
@Entity("recursos_educativos", { schema: "public" })
export class RecursosEducativos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_recurso" })
  idRecurso: number;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", {
    name: "tipo_recurso",
    nullable: true,
    length: 50,
  })
  tipoRecurso: string | null;

  @Column("character varying", {
    name: "url_recurso",
    nullable: true,
    length: 255,
  })
  urlRecurso: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.recursosEducativos)
  @JoinColumn([{ name: "id_asesoria", referencedColumnName: "idAsesoria" }])
  idAsesoria: Asesorias;

  @ManyToOne(() => Materias, (materias) => materias.recursosEducativos)
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria: Materias;
}
