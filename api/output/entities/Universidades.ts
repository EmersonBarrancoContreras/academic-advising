import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carreras } from "./Carreras";
import { SedesUniversitarias } from "./SedesUniversitarias";

@Index("universidades_pkey", ["idUniversidad"], { unique: true })
@Index("universidades_nombre_unique", ["nombre"], { unique: true })
@Entity("universidades", { schema: "public" })
export class Universidades {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_universidad" })
  idUniversidad: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  nombre: string;

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "ciudad", length: 100 })
  ciudad: string;

  @Column("character varying", {
    name: "pais",
    nullable: true,
    length: 100,
    default: () => "'Colombia'",
  })
  pais: string | null;

  @Column("character varying", {
    name: "sitio_web",
    nullable: true,
    length: 255,
  })
  sitioWeb: string | null;

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

  @OneToMany(() => Carreras, (carreras) => carreras.idUniversidad2)
  carreras: Carreras[];

  @OneToMany(
    () => SedesUniversitarias,
    (sedesUniversitarias) => sedesUniversitarias.idUniversidad2
  )
  sedesUniversitarias: SedesUniversitarias[];
}
