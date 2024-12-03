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

@Index("log_cambios_materias_asesor_pkey", ["idLog"], { unique: true })
@Entity("log_cambios_materias_asesor", { schema: "public" })
export class LogCambiosMateriasAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_log" })
  idLog: number;

  @Column("character varying", { name: "tipo_cambio", length: 10 })
  tipoCambio: string;

  @Column("timestamp without time zone", {
    name: "fecha_cambio",
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCambio: Date;

  @Column("text", { name: "usuario_cambio" })
  usuarioCambio: string;

  @Column("jsonb", { name: "datos_antiguos", nullable: true })
  datosAntiguos: object | null;

  @Column("jsonb", { name: "datos_nuevos", nullable: true })
  datosNuevos: object | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.logCambiosMateriasAsesors)
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;

  @ManyToOne(() => Materias, (materias) => materias.logCambiosMateriasAsesors)
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria: Materias;
}
