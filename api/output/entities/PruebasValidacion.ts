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

@Index("pruebas_validacion_pkey", ["idPrueba"], { unique: true })
@Entity("pruebas_validacion", { schema: "public" })
export class PruebasValidacion {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_prueba" })
  idPrueba: number;

  @Column("numeric", {
    name: "puntaje",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  puntaje: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_prueba",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaPrueba: Date | null;

  @Column("boolean", { name: "aprobada", nullable: true })
  aprobada: boolean | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.pruebasValidacions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;

  @ManyToOne(() => Materias, (materias) => materias.pruebasValidacions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria: Materias;
}
