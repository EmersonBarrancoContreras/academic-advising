import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";
import { ComprasPaquete } from "./ComprasPaquete";
import { Carreras } from "./Carreras";
import { Colegios } from "./Colegios";
import { SedesUniversitarias } from "./SedesUniversitarias";
import { Usuarios } from "./Usuarios";
import { PreferenciasAsesoria } from "./PreferenciasAsesoria";

@Index("estudiantes_pkey", ["idEstudiante"], { unique: true })
@Entity("estudiantes", { schema: "public" })
export class Estudiantes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_estudiante" })
  idEstudiante: number;

  @Column("enum", {
    name: "nivel_academico",
    enum: ["primaria", "secundaria", "universitario"],
  })
  nivelAcademico: "primaria" | "secundaria" | "universitario";

  @Column("integer", { name: "grado_actual", nullable: true })
  gradoActual: number | null;

  @Column("integer", { name: "semestre_actual", nullable: true })
  semestreActual: number | null;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idEstudiante)
  asesorias: Asesorias[];

  @OneToMany(
    () => ComprasPaquete,
    (comprasPaquete) => comprasPaquete.idEstudiante
  )
  comprasPaquetes: ComprasPaquete[];

  @ManyToOne(() => Carreras, (carreras) => carreras.estudiantes, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_carrera", referencedColumnName: "idCarrera" }])
  idCarrera: Carreras;

  @ManyToOne(() => Colegios, (colegios) => colegios.estudiantes, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_colegio", referencedColumnName: "idColegio" }])
  idColegio: Colegios;

  @ManyToOne(
    () => SedesUniversitarias,
    (sedesUniversitarias) => sedesUniversitarias.estudiantes,
    { onDelete: "RESTRICT" }
  )
  @JoinColumn([{ name: "id_sede", referencedColumnName: "idSede" }])
  idSede: SedesUniversitarias;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.estudiantes, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "idUsuario" }])
  idUsuario: Usuarios;

  @OneToMany(
    () => PreferenciasAsesoria,
    (preferenciasAsesoria) => preferenciasAsesoria.idEstudiante
  )
  preferenciasAsesorias: PreferenciasAsesoria[];
}
