import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./asesores.entity";
import { TemasMateria } from "./temasMateria.entity";

@Index(
  "especializaciones_asesor_id_asesor_id_tema_key",
  ["idAsesor", "idTema"],
  { unique: true }
)
@Index("especializaciones_asesor_pkey", ["idEspecializacion"], { unique: true })
@Entity("especializaciones_asesor", { schema: "public" })
export class EspecializacionesAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_especializacion" })
  public idEspecializacion: number;

  @Column("integer", { name: "id_asesor", unique: true })
  public idAsesor: number;

  @Column("integer", { name: "id_tema", unique: true })
  public idTema: number;

  @Column("character varying", {
    name: "nivel_experiencia",
    nullable: true,
    length: 50,
  })
  public nivelExperiencia: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  public fechaRegistro: Date | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.especializacionesAsesor, {
    lazy: true,
  })
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  public idAsesor2: Promise<Asesores>;

  @ManyToOne(
    () => TemasMateria,
    (temasMateria) => temasMateria.especializacionesAsesor,
    { lazy: true }
  )
  @JoinColumn([{ name: "id_tema", referencedColumnName: "idTema" }])
  public idTema2: Promise<TemasMateria>;
}
