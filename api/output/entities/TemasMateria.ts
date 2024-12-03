import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EspecializacionesAsesor } from "./EspecializacionesAsesor";
import { Materias } from "./Materias";

@Index("temas_materia_id_materia_nombre_key", ["idMateria", "nombre"], {
  unique: true,
})
@Index("temas_materia_pkey", ["idTema"], { unique: true })
@Entity("temas_materia", { schema: "public" })
export class TemasMateria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_tema" })
  idTema: number;

  @Column("integer", { name: "id_materia", unique: true })
  idMateria: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(
    () => EspecializacionesAsesor,
    (especializacionesAsesor) => especializacionesAsesor.idTema2
  )
  especializacionesAsesors: EspecializacionesAsesor[];

  @ManyToOne(() => Materias, (materias) => materias.temasMaterias)
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria2: Materias;
}
