import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Universidades } from "./Universidades";
import { Estudiantes } from "./Estudiantes";
import { Materias } from "./Materias";

@Index("carreras_pkey", ["idCarrera"], { unique: true })
@Index("carreras_nombre_universidad_unique", ["idUniversidad", "nombre"], {
  unique: true,
})
@Index("carreras_nombre_unique", ["nombre"], { unique: true })
@Entity("carreras", { schema: "public" })
export class Carreras {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_carrera" })
  idCarrera: number;

  @Column("character varying", { name: "nombre", length: 255 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("integer", { name: "numero_semestres" })
  numeroSemestres: number;

  @Column("integer", { name: "id_universidad", nullable: true, unique: true })
  idUniversidad: number | null;

  @ManyToOne(() => Universidades, (universidades) => universidades.carreras, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([
    { name: "id_universidad", referencedColumnName: "idUniversidad" },
  ])
  idUniversidad2: Universidades;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idCarrera)
  estudiantes: Estudiantes[];

  @OneToMany(() => Materias, (materias) => materias.idCarrera2)
  materias: Materias[];
}
