import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";
import { LogCambiosMateriasAsesor } from "./LogCambiosMateriasAsesor";
import { MaterialDidactico } from "./MaterialDidactico";
import { Carreras } from "./Carreras";
import { AreasEspecializacion } from "./AreasEspecializacion";
import { MateriasAsesor } from "./MateriasAsesor";
import { MicroCurriculos } from "./MicroCurriculos";
import { PruebasValidacion } from "./PruebasValidacion";
import { RecursosEducativos } from "./RecursosEducativos";
import { TemasMateria } from "./TemasMateria";

@Index(
  "materias_nombre_nivel_grado_unique",
  ["gradoEscolar", "idCarrera", "nivelAcademico", "nombre", "semestre"],
  { unique: true }
)
@Index("materias_pkey", ["idMateria"], { unique: true })
@Index("idx_materias_nivel", ["nivelAcademico"], {})
@Entity("materias", { schema: "public" })
export class Materias {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_materia" })
  idMateria: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  nombre: string;

  @Column("enum", {
    name: "nivel_academico",
    unique: true,
    enum: ["primaria", "secundaria", "universitario"],
  })
  nivelAcademico: "primaria" | "secundaria" | "universitario";

  @Column("integer", { name: "grado_escolar", nullable: true, unique: true })
  gradoEscolar: number | null;

  @Column("integer", { name: "id_carrera", nullable: true, unique: true })
  idCarrera: number | null;

  @Column("integer", { name: "semestre", nullable: true, unique: true })
  semestre: number | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  activa: boolean | null;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idMateria)
  asesorias: Asesorias[];

  @OneToMany(
    () => LogCambiosMateriasAsesor,
    (logCambiosMateriasAsesor) => logCambiosMateriasAsesor.idMateria
  )
  logCambiosMateriasAsesors: LogCambiosMateriasAsesor[];

  @OneToMany(
    () => MaterialDidactico,
    (materialDidactico) => materialDidactico.idMateria
  )
  materialDidacticos: MaterialDidactico[];

  @ManyToOne(() => Carreras, (carreras) => carreras.materias, {
    onDelete: "RESTRICT",
  })
  @JoinColumn([{ name: "id_carrera", referencedColumnName: "idCarrera" }])
  idCarrera2: Carreras;

  @ManyToMany(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.materias
  )
  areasEspecializacions: AreasEspecializacion[];

  @OneToMany(
    () => MateriasAsesor,
    (materiasAsesor) => materiasAsesor.idMateria2
  )
  materiasAsesors: MateriasAsesor[];

  @OneToMany(
    () => MicroCurriculos,
    (microCurriculos) => microCurriculos.idMateria2
  )
  microCurriculos: MicroCurriculos[];

  @OneToMany(
    () => PruebasValidacion,
    (pruebasValidacion) => pruebasValidacion.idMateria
  )
  pruebasValidacions: PruebasValidacion[];

  @OneToMany(
    () => RecursosEducativos,
    (recursosEducativos) => recursosEducativos.idMateria
  )
  recursosEducativos: RecursosEducativos[];

  @OneToMany(() => TemasMateria, (temasMateria) => temasMateria.idMateria2)
  temasMaterias: TemasMateria[];
}
