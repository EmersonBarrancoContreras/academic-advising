import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Materias } from "./Materias";

@Index("material_didactico_pkey", ["idMaterial"], { unique: true })
@Entity("material_didactico", { schema: "public" })
export class MaterialDidactico {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_material" })
  idMaterial: number;

  @Column("character varying", { name: "titulo", length: 255 })
  titulo: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("character varying", {
    name: "tipo_material",
    nullable: true,
    length: 50,
  })
  tipoMaterial: string | null;

  @Column("character varying", {
    name: "nivel_dificultad",
    nullable: true,
    length: 50,
  })
  nivelDificultad: string | null;

  @Column("text", { name: "contenido", nullable: true })
  contenido: string | null;

  @Column("character varying", {
    name: "url_recurso",
    nullable: true,
    length: 255,
  })
  urlRecurso: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 50,
    default: () => "'activo'",
  })
  estado: string | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.materialDidacticos)
  @JoinColumn([{ name: "creado_por", referencedColumnName: "idUsuario" }])
  creadoPor: Usuarios;

  @ManyToOne(() => Materias, (materias) => materias.materialDidacticos)
  @JoinColumn([{ name: "id_materia", referencedColumnName: "idMateria" }])
  idMateria: Materias;
}
