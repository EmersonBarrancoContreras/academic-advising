import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carreras } from "./carreras.entity";
import { Materias } from "./materias.entity";
import { SedesUniversitarias } from "./sedesUniversitarias.entity";

@Index("universidades_pkey", ["idUniversidad"], { unique: true })
@Index("universidades_nombre_unique", ["nombre"], { unique: true })
@Entity("universidades", { schema: "public" })
export class Universidades {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_universidad" })
  public idUniversidad: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  public nombre: string;

  @Column("text", { name: "direccion", nullable: true })
  public direccion: string | null;

  @Column("character varying", { name: "ciudad", length: 100 })
  public ciudad: string;

  @Column("character varying", {
    name: "pais",
    nullable: true,
    length: 100,
    default: () => "'Colombia'",
  })
  public pais: string | null;

  @Column("character varying", {
    name: "sitio_web",
    nullable: true,
    length: 255,
  })
  public sitioWeb: string | null;

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

  @OneToMany(() => Carreras, (carreras) => carreras.idUniversidad2, {
    lazy: true,
  })
  public carreras: Promise<Carreras[]>;

  @OneToMany(() => Materias, (materias) => materias.idUniversidad, {
    lazy: true,
  })
  public materias: Promise<Materias[]>;

  @OneToMany(
    () => SedesUniversitarias,
    (sedesUniversitarias) => sedesUniversitarias.idUniversidad2,
    { lazy: true }
  )
  public sedesUniversitarias: Promise<SedesUniversitarias[]>;
}
