import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Colegios } from "./Colegios";
import { Materias } from "./Materias";

@Index("micro_curriculos_colegio_materia_unique", ["idColegio", "idMateria"], {
  unique: true,
})
@Index("micro_curriculos_pkey", ["idMicroCurriculo"], { unique: true })
@Entity("micro_curriculos", { schema: "public" })
export class MicroCurriculos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_micro_curriculo" })
  idMicroCurriculo: number;

  @Column("integer", { name: "id_colegio", nullable: true, unique: true })
  idColegio: number | null;

  @Column("integer", { name: "id_materia", nullable: true, unique: true })
  idMateria: number | null;

  @Column("text", { name: "contenido" })
  contenido: string;

  @Column("text", { name: "objetivos", nullable: true })
  objetivos: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_actualizacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaActualizacion: Date | null;

  @ManyToOne(() => Colegios, (colegios) => colegios.microCurriculos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_colegio", referencedColumnName: "idColegio" }])
  idColegio2: Colegios;

  @ManyToOne(() => Materias, (materias) => materias.microCurriculos, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria2: Materias;
}
