import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";
import { Universidades } from "./Universidades";

@Index("sedes_universitarias_pkey", ["idSede"], { unique: true })
@Index("sedes_nombre_universidad_unique", ["idUniversidad", "nombre"], {
  unique: true,
})
@Entity("sedes_universitarias", { schema: "public" })
export class SedesUniversitarias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sede" })
  idSede: number;

  @Column("integer", { name: "id_universidad", unique: true })
  idUniversidad: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  nombre: string;

  @Column("text", { name: "direccion" })
  direccion: string;

  @Column("character varying", { name: "ciudad", length: 100 })
  ciudad: string;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  activa: boolean | null;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idSede)
  estudiantes: Estudiantes[];

  @ManyToOne(
    () => Universidades,
    (universidades) => universidades.sedesUniversitarias,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_universidad", referencedColumnName: "idUniversidad" },
  ])
  idUniversidad2: Universidades;
}
