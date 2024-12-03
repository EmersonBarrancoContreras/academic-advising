import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiantes } from "./Estudiantes";
import { PaquetesAsesoria } from "./PaquetesAsesoria";

@Index("compras_paquete_pkey", ["idCompra"], { unique: true })
@Entity("compras_paquete", { schema: "public" })
export class ComprasPaquete {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_compra" })
  idCompra: number;

  @Column("timestamp without time zone", {
    name: "fecha_compra",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCompra: Date | null;

  @Column("timestamp without time zone", { name: "fecha_vencimiento" })
  fechaVencimiento: Date;

  @Column("numeric", { name: "horas_restantes", precision: 10, scale: 2 })
  horasRestantes: string;

  @Column("character varying", {
    name: "estado",
    nullable: true,
    length: 50,
    default: () => "'activo'",
  })
  estado: string | null;

  @ManyToOne(() => Estudiantes, (estudiantes) => estudiantes.comprasPaquetes)
  @JoinColumn([{ name: "id_estudiante", referencedColumnName: "idEstudiante" }])
  idEstudiante: Estudiantes;

  @ManyToOne(
    () => PaquetesAsesoria,
    (paquetesAsesoria) => paquetesAsesoria.comprasPaquetes
  )
  @JoinColumn([{ name: "id_paquete", referencedColumnName: "idPaquete" }])
  idPaquete: PaquetesAsesoria;
}
