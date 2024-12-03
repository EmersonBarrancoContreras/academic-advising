import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Asesorias } from "./Asesorias";
import { CertificacionesAsesor } from "./CertificacionesAsesor";
import { EspecializacionesAsesor } from "./EspecializacionesAsesor";
import { HorariosDisponibilidad } from "./HorariosDisponibilidad";
import { LogCambiosMateriasAsesor } from "./LogCambiosMateriasAsesor";
import { LogValidacionesAsesor } from "./LogValidacionesAsesor";
import { MateriasAsesor } from "./MateriasAsesor";
import { PruebasValidacion } from "./PruebasValidacion";

@Index("asesores_pkey", ["idAsesor"], { unique: true })
@Entity("asesores", { schema: "public" })
export class Asesores {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_asesor" })
  idAsesor: number;

  @Column("numeric", {
    name: "calificacion_promedio",
    nullable: true,
    precision: 3,
    scale: 2,
  })
  calificacionPromedio: string | null;

  @Column("boolean", {
    name: "estado_validacion",
    nullable: true,
    default: () => "false",
  })
  estadoValidacion: boolean | null;

  @Column("text", { name: "descripcion_perfil", nullable: true })
  descripcionPerfil: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_validacion",
    nullable: true,
  })
  fechaValidacion: Date | null;

  @Column("numeric", {
    name: "tarifa_hora",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  tarifaHora: string | null;

  @Column("integer", { name: "experiencia_anios", nullable: true })
  experienciaAnios: number | null;

  @Column("character varying", {
    name: "titulo_profesional",
    nullable: true,
    length: 255,
  })
  tituloProfesional: string | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.asesores, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuarios;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idAsesor)
  asesorias: Asesorias[];

  @OneToMany(
    () => CertificacionesAsesor,
    (certificacionesAsesor) => certificacionesAsesor.idAsesor
  )
  certificacionesAsesors: CertificacionesAsesor[];

  @OneToMany(
    () => EspecializacionesAsesor,
    (especializacionesAsesor) => especializacionesAsesor.idAsesor2
  )
  especializacionesAsesors: EspecializacionesAsesor[];

  @OneToMany(
    () => HorariosDisponibilidad,
    (horariosDisponibilidad) => horariosDisponibilidad.idAsesor
  )
  horariosDisponibilidads: HorariosDisponibilidad[];

  @OneToMany(
    () => LogCambiosMateriasAsesor,
    (logCambiosMateriasAsesor) => logCambiosMateriasAsesor.idAsesor
  )
  logCambiosMateriasAsesors: LogCambiosMateriasAsesor[];

  @OneToMany(
    () => LogValidacionesAsesor,
    (logValidacionesAsesor) => logValidacionesAsesor.idAsesor
  )
  logValidacionesAsesors: LogValidacionesAsesor[];

  @OneToMany(() => MateriasAsesor, (materiasAsesor) => materiasAsesor.idAsesor2)
  materiasAsesors: MateriasAsesor[];

  @OneToMany(
    () => PruebasValidacion,
    (pruebasValidacion) => pruebasValidacion.idAsesor
  )
  pruebasValidacions: PruebasValidacion[];
}
