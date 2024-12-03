import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Materias } from "./Materias";

@Index("areas_especializacion_pkey", ["idArea"], { unique: true })
@Entity("areas_especializacion", { schema: "public" })
export class AreasEspecializacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_area" })
  idArea: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("enum", {
    name: "nivel_academico",
    enum: ["primaria", "secundaria", "universitario"],
  })
  nivelAcademico: "primaria" | "secundaria" | "universitario";

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @ManyToOne(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.areasEspecializacions
  )
  @JoinColumn([{ name: "area_padre_id", referencedColumnName: "idArea" }])
  areaPadre: AreasEspecializacion;

  @OneToMany(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.areaPadre
  )
  areasEspecializacions: AreasEspecializacion[];

  @ManyToMany(() => Materias, (materias) => materias.areasEspecializacions)
  @JoinTable({
    name: "materias_areas",
    joinColumns: [{ name: "id_area", referencedColumnName: "idArea" }],
    inverseJoinColumns: [
      { name: "id_materia", referencedColumnName: "idMateria" },
    ],
    schema: "public",
  })
  materias: Materias[];
}
