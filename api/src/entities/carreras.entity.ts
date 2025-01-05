import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Universidades } from "./universidades.entity";
import { Estudiantes } from "./estudiantes.entity";
import { Materias } from "./materias.entity";

@Index("carreras_pkey", ["idCarrera"], { unique: true })
@Index("carreras_nombre_universidad_unique", ["idUniversidad", "nombre"], {
  unique: true,
})
@Index("carreras_nombre_unique", ["nombre"], { unique: true })
@Entity("carreras", { schema: "public" })
export class Carreras {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_carrera" })
  public idCarrera: number;

  @Column("character varying", { name: "nombre", length: 255 })
  public nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  public descripcion: string | null;

  @Column("integer", { name: "numero_semestres" })
  public numeroSemestres: number;

  @Column("integer", { name: "id_universidad", nullable: true, unique: true })
  public idUniversidad: number | null;

  @ManyToOne(() => Universidades, (universidades) => universidades.carreras, {
    onDelete: "RESTRICT",
    lazy: true,
  })
  @JoinColumn([
    { name: "id_universidad", referencedColumnName: "idUniversidad" },
  ])
  public idUniversidad2: Promise<Universidades>;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idCarrera, {
    lazy: true,
  })
  public estudiantes: Promise<Estudiantes[]>;

  @OneToMany(() => Materias, (materias) => materias.idCarrera2, { lazy: true })
  public materias: Promise<Materias[]>;
}
