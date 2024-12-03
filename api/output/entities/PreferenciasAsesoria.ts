import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";

@Index("preferencias_asesoria_pkey", ["idPreferencia"], { unique: true })
@Entity("preferencias_asesoria", { schema: "public" })
export class PreferenciasAsesoria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_preferencia" })
  idPreferencia: number;

  @Column("character varying", {
    name: "modalidad_preferida",
    nullable: true,
    length: 50,
  })
  modalidadPreferida: string | null;

  @Column("json", { name: "horario_preferido", nullable: true })
  horarioPreferido: object | null;

  @Column("character varying", {
    name: "nivel_dificultad_preferido",
    nullable: true,
    length: 50,
  })
  nivelDificultadPreferido: string | null;

  @Column("character varying", {
    name: "tipo_asesor_preferido",
    nullable: true,
    length: 50,
  })
  tipoAsesorPreferido: string | null;

  @Column("text", { name: "notas_adicionales", nullable: true })
  notasAdicionales: string | null;

  @Column("timestamp without time zone", {
    name: "ultima_actualizacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  ultimaActualizacion: Date | null;

  @ManyToOne(
    () => Estudiantes,
    (estudiantes) => estudiantes.preferenciasAsesorias
  )
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiantes;
}
