import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./asesores.entity";
import { Materias } from "./materias.entity";

@Index("materias_asesor_unique", ["idAsesor", "idMateria"], { unique: true })
@Index("materias_asesor_pkey", ["idMateriaAsesor"], { unique: true })
@Entity("materias_asesor", { schema: "public" })
export class MateriasAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_materia_asesor" })
  public idMateriaAsesor: number;

  @Column("integer", { name: "id_asesor", nullable: true, unique: true })
  public idAsesor: number | null;

  @Column("integer", { name: "id_materia", nullable: true, unique: true })
  public idMateria: number | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaRegistro: Date | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.materiasAsesor, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  public idAsesor2: Promise<Asesores>;

  @ManyToOne(() => Materias, (materias) => materias.materiasAsesor, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  public idMateria2: Promise<Materias>;
}
