import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";
import { TemasMateria } from "./TemasMateria";

@Index(
  "especializaciones_asesor_id_asesor_id_tema_key",
  ["idAsesor", "idTema"],
  { unique: true }
)
@Index("especializaciones_asesor_pkey", ["idEspecializacion"], { unique: true })
@Entity("especializaciones_asesor", { schema: "public" })
export class EspecializacionesAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_especializacion" })
  idEspecializacion: number;

  @Column("integer", { name: "id_asesor", unique: true })
  idAsesor: number;

  @Column("integer", { name: "id_tema", unique: true })
  idTema: number;

  @Column("character varying", {
    name: "nivel_experiencia",
    nullable: true,
    length: 50,
  })
  nivelExperiencia: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.especializacionesAsesors)
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor2: Asesores;

  @ManyToOne(
    () => TemasMateria,
    (temasMateria) => temasMateria.especializacionesAsesors
  )
  @JoinColumn([{ name: "id_tema", referencedColumnName: "idTema" }])
  idTema2: TemasMateria;
}
