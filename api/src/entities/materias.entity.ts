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
import { Asesorias } from "./asesorias.entity";
import { Asesores } from "./asesores.entity";
import { Carreras } from "./carreras.entity";
import { Universidades } from "./universidades.entity";
import { AreasEspecializacion } from "./areasEspecializacion.entity";
import { MateriasAsesor } from "./materiasAsesor.entity";
import { PrerequisitosMateria } from "./prerequisitosMateria.entity";
import { RecursosMateria } from "./recursosMateria.entity";
import { TemasMateria } from "./temasMateria.entity";

@Index("materias_codigo_unique", ["codigo"], { unique: true })
@Index("idx_materias_codigo", ["codigo"], {})
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
  public idMateria: number;

  @Column("character varying", { name: "nombre", unique: true, length: 255 })
  public nombre: string;

  @Column("enum", {
    name: "nivel_academico",
    unique: true,
    enum: ["primaria", "secundaria", "universitario"],
    default: () => "'universitario'",
  })
  public nivelAcademico: "primaria" | "secundaria" | "universitario";

  @Column("integer", { name: "grado_escolar", nullable: true, unique: true })
  public gradoEscolar: number | null;

  @Column("integer", { name: "id_carrera", nullable: true, unique: true })
  public idCarrera: number | null;

  @Column("integer", { name: "semestre", nullable: true, unique: true })
  public semestre: number | null;

  @Column("text", { name: "descripcion", nullable: true })
  public descripcion: string | null;

  @Column("boolean", { name: "activa", nullable: true, default: () => "true" })
  public activa: boolean | null;

  @Column("character varying", { name: "codigo", unique: true, length: 20 })
  public codigo: string;

  @Column("character varying", {
    name: "departamento",
    nullable: true,
    length: 100,
  })
  public departamento: string | null;

  @Column("integer", { name: "creditos", default: () => "0" })
  public creditos: number;

  @Column("numeric", {
    name: "calificacion_promedio",
    nullable: true,
    precision: 3,
    scale: 2,
  })
  public calificacionPromedio: string | null;

  @Column("integer", { name: "cupo_total", nullable: true })
  public cupoTotal: number | null;

  @Column("integer", { name: "cupo_disponible", nullable: true })
  public cupoDisponible: number | null;

  @Column("character varying", {
    name: "modalidad",
    nullable: true,
    length: 50,
  })
  public modalidad: string | null;

  @Column("text", { name: "horario", nullable: true })
  public horario: string | null;

  @Column("numeric", {
    name: "tasa_aprobacion",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  public tasaAprobacion: string | null;

  @Column("int4", { name: "prerequisitos", nullable: true, array: true })
  public prerequisitos: number[] | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaCreacion: Date | null;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idMateria, {
    lazy: true,
  })
  public asesorias: Promise<Asesorias[]>;

  @ManyToOne(() => Asesores, (asesores) => asesores.materias, { lazy: true })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  public idAsesor: Promise<Asesores>;

  @ManyToOne(() => Carreras, (carreras) => carreras.materias, {
    onDelete: "RESTRICT",
    lazy: true,
  })
  @JoinColumn([{ name: "id_carrera", referencedColumnName: "idCarrera" }])
  public idCarrera2: Promise<Carreras>;

  @ManyToOne(() => Universidades, (universidades) => universidades.materias, {
    onDelete: "RESTRICT",
    lazy: true,
  })
  @JoinColumn([
    { name: "id_universidad", referencedColumnName: "idUniversidad" },
  ])
  public idUniversidad: Promise<Universidades>;

  @ManyToMany(
    () => AreasEspecializacion,
    (areasEspecializacion) => areasEspecializacion.materias,
    { lazy: true }
  )
  public areasEspecializacion: Promise<AreasEspecializacion[]>;

  @OneToMany(
    () => MateriasAsesor,
    (materiasAsesor) => materiasAsesor.idMateria2,
    { lazy: true }
  )
  public materiasAsesor: Promise<MateriasAsesor[]>;

  @OneToMany(
    () => PrerequisitosMateria,
    (prerequisitosMateria) => prerequisitosMateria.idMateria2,
    { lazy: true }
  )
  public prerequisitosMateria: Promise<PrerequisitosMateria[]>;

  @OneToMany(
    () => PrerequisitosMateria,
    (prerequisitosMateria) => prerequisitosMateria.idPrerequisito2,
    { lazy: true }
  )
  public prerequisitosMateria2: Promise<PrerequisitosMateria[]>;

  @OneToMany(
    () => RecursosMateria,
    (recursosMateria) => recursosMateria.idMateria,
    { lazy: true }
  )
  public recursosMateria: Promise<RecursosMateria[]>;

  @OneToMany(() => TemasMateria, (temasMateria) => temasMateria.idMateria2, {
    lazy: true,
  })
  public temasMateria: Promise<TemasMateria[]>;
}
