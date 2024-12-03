import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";

@Index("horarios_disponibilidad_pkey", ["idHorario"], { unique: true })
@Entity("horarios_disponibilidad", { schema: "public" })
export class HorariosDisponibilidad {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_horario" })
  idHorario: number;

  @Column("integer", { name: "dia_semana" })
  diaSemana: number;

  @Column("time without time zone", { name: "hora_inicio" })
  horaInicio: string;

  @Column("time without time zone", { name: "hora_fin" })
  horaFin: string;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.horariosDisponibilidads)
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;
}
