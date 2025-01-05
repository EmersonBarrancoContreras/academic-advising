import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./estudiantes.entity";

@Index("colegios_nombre_ciudad_unique", ["ciudad", "nombre"], { unique: true })
@Index("colegios_pkey", ["idColegio"], { unique: true })
@Entity("colegios", { schema: "public" })
export class Colegios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_colegio" })
  public idColegio: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  public nombre: string;

  @Column("text", { name: "direccion", nullable: true })
  public direccion: string | null;

  @Column("character varying", { name: "ciudad", unique: true, length: 100 })
  public ciudad: string;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaRegistro: Date | null;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idColegio, {
    lazy: true,
  })
  public estudiantes: Promise<Estudiantes[]>;
}
