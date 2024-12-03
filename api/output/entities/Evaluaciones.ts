import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";

@Index("idx_evaluaciones_calificacion", ["calificacion"], {})
@Index("evaluaciones_asesoria_unique", ["idAsesoria"], { unique: true })
@Index("evaluaciones_pkey", ["idEvaluacion"], { unique: true })
@Entity("evaluaciones", { schema: "public" })
export class Evaluaciones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_evaluacion" })
  idEvaluacion: number;

  @Column("integer", { name: "id_asesoria", nullable: true, unique: true })
  idAsesoria: number | null;

  @Column("integer", { name: "calificacion", nullable: true })
  calificacion: number | null;

  @Column("text", { name: "comentario", nullable: true })
  comentario: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_evaluacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaEvaluacion: Date | null;

  @OneToOne(() => Asesorias, (asesorias) => asesorias.evaluaciones, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_asesoria", referencedColumnName: "idAsesoria" }])
  idAsesoria2: Asesorias;
}
