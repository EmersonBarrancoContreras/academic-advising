import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./estudiantes.entity";
import { Universidades } from "./universidades.entity";

@Index("sedes_universitarias_pkey", ["idSede"], { unique: true })
@Index("sedes_nombre_universidad_unique", ["idUniversidad", "nombre"], {
  unique: true,
})
@Entity("sedes_universitarias", { schema: "public" })
export class SedesUniversitarias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_sede" })
  public idSede: number;

  @Column("integer", { name: "id_universidad", unique: true })
  public idUniversidad: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  public nombre: string;

  @Column("text", { name: "direccion" })
  public direccion: string;

  @Column("character varying", { name: "ciudad", length: 100 })
  public ciudad: string;

  @Column("character varying", { name: "telefono", nullable: true, length: 20 })
  public telefono: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaRegistro: Date | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  public activa: boolean | null;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idSede, {
    lazy: true,
  })
  public estudiantes: Promise<Estudiantes[]>;

  @ManyToOne(
    () => Universidades,
    (universidades) => universidades.sedesUniversitarias,
    { onDelete: "CASCADE", lazy: true }
  )
  @JoinColumn([
    { name: "id_universidad", referencedColumnName: "idUniversidad" },
  ])
  public idUniversidad2: Promise<Universidades>;
}
