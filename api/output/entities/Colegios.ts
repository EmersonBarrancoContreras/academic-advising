import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";
import { MicroCurriculos } from "./MicroCurriculos";

@Index("colegios_nombre_ciudad_unique", ["ciudad", "nombre"], { unique: true })
@Index("colegios_pkey", ["idColegio"], { unique: true })
@Entity("colegios", { schema: "public" })
export class Colegios {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_colegio" })
  idColegio: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  nombre: string;

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("character varying", { name: "ciudad", unique: true, length: 100 })
  ciudad: string;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @OneToMany(() => Estudiantes, (estudiantes) => estudiantes.idColegio)
  estudiantes: Estudiantes[];

  @OneToMany(
    () => MicroCurriculos,
    (microCurriculos) => microCurriculos.idColegio2
  )
  microCurriculos: MicroCurriculos[];
}
