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
import { Materias } from "./materias.entity";

@Index("areas_especializacion_pkey", ["idArea"], { unique: true })
@Entity("areas_especializacion", { schema: "public" })
export class AreasEspecializacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_area" })
  public idArea: number;

  @Column("character varying", { name: "nombre", length: 100 })
  public nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  public descripcion: string | null;

  @Column("enum", {
    name: "nivel_academico",
    enum: ["primaria", "secundaria", "universitario"],
  })
  public nivelAcademico: "primaria" | "secundaria" | "universitario";

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  public activo: boolean | null;

  @ManyToOne(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.areasEspecializacion,
    { lazy: true }
  )
  @JoinColumn([{ name: "area_padre_id", referencedColumnName: "idArea" }])
  public areaPadre: Promise<AreasEspecializacion>;

  @OneToMany(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.areaPadre,
    { lazy: true }
  )
  public areasEspecializacion: Promise<AreasEspecializacion[]>;

  @ManyToMany(() => Materias, (materias) => materias.areasEspecializacion, {
    lazy: true,
  })
  @JoinTable({
    name: "materias_areas",
    joinColumns: [{ name: "id_area", referencedColumnName: "idArea" }],
    inverseJoinColumns: [
      { name: "id_materia", referencedColumnName: "idMateria" },
    ],
    schema: "public",
  })
  public materias: Promise<Materias[]>;
}
