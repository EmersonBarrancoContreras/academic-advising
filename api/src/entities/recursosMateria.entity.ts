import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Materias } from "./materias.entity";

@Index("recursos_materia_pkey", ["idRecurso"], { unique: true })
@Entity("recursos_materia", { schema: "public" })
export class RecursosMateria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_recurso" })
  public idRecurso: number;

  @Column("text", { name: "url" })
  public url: string;

  @Column("character varying", { name: "tipo", nullable: true, length: 50 })
  public tipo: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  public descripcion: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaCreacion: Date | null;

  @ManyToOne(() => Materias, (materias) => materias.recursosMateria, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  public idMateria: Promise<Materias>;
}
