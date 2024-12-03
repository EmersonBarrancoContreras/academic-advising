import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";
import { Materias } from "./Materias";

@Index("materias_asesor_unique", ["idAsesor", "idMateria"], { unique: true })
@Index("materias_asesor_pkey", ["idMateriaAsesor"], { unique: true })
@Entity("materias_asesor", { schema: "public" })
export class MateriasAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_materia_asesor" })
  idMateriaAsesor: number;

  @Column("integer", { name: "id_asesor", nullable: true, unique: true })
  idAsesor: number | null;

  @Column("integer", { name: "id_materia", nullable: true, unique: true })
  idMateria: number | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.materiasAsesors, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor2: Asesores;

  @ManyToOne(() => Materias, (materias) => materias.materiasAsesors, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria2: Materias;
}
