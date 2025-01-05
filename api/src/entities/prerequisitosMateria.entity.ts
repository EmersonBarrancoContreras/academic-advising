import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Materias } from "./materias.entity";

@Index("prerequisitos_materia_pkey", ["idMateria", "idPrerequisito"], {
  unique: true,
})
@Entity("prerequisitos_materia", { schema: "public" })
export class PrerequisitosMateria {
  @Column("integer", { primary: true, name: "id_materia" })
  public idMateria: number;

  @Column("integer", { primary: true, name: "id_prerequisito" })
  public idPrerequisito: number;

  @ManyToOne(() => Materias, (materias) => materias.prerequisitosMateria, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  public idMateria2: Promise<Materias>;

  @ManyToOne(() => Materias, (materias) => materias.prerequisitosMateria2, {
    onDelete: "CASCADE",
    lazy: true,
  })
  @JoinColumn([{ name: "id_prerequisito", referencedColumnName: "idMateria" }])
  public idPrerequisito2: Promise<Materias>;
}
