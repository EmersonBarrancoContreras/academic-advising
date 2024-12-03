import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesorias } from "./Asesorias";

@Index("pagos_asesoria_pkey", ["idPago"], { unique: true })
@Entity("pagos_asesoria", { schema: "public" })
export class PagosAsesoria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_pago" })
  idPago: number;

  @Column("numeric", { name: "monto", precision: 10, scale: 2 })
  monto: string;

  @Column("character varying", { name: "estado_pago", length: 50 })
  estadoPago: string;

  @Column("timestamp without time zone", { name: "fecha_pago", nullable: true })
  fechaPago: Date | null;

  @Column("character varying", {
    name: "metodo_pago",
    nullable: true,
    length: 50,
  })
  metodoPago: string | null;

  @Column("character varying", {
    name: "referencia_pago",
    nullable: true,
    length: 100,
  })
  referenciaPago: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_registro",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaRegistro: Date | null;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.pagosAsesorias)
  @JoinColumn([{ name: "id_asesoria", referencedColumnName: "idAsesoria" }])
  idAsesoria: Asesorias;
}
