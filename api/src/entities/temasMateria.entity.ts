import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EspecializacionesAsesor } from "./especializacionesAsesor.entity";
import { Materias } from "./materias.entity";

@Index("temas_materia_id_materia_nombre_key", ["idMateria", "nombre"], {
  unique: true,
})
@Index("temas_materia_pkey", ["idTema"], { unique: true })
@Entity("temas_materia", { schema: "public" })
export class TemasMateria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_tema" })
  public idTema: number;

  @Column("integer", { name: "id_materia", unique: true })
  public idMateria: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  public nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  public descripcion: string | null;

  @OneToMany(
    () => EspecializacionesAsesor,
    (especializacionesAsesor) => especializacionesAsesor.idTema2,
    { lazy: true }
  )
  public especializacionesAsesor: Promise<EspecializacionesAsesor[]>;

  @ManyToOne(() => Materias, (materias) => materias.temasMateria, {
    lazy: true,
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  public idMateria2: Promise<Materias>;
}
