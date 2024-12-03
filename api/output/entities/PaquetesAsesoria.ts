import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ComprasPaquete } from "./ComprasPaquete";

@Index("paquetes_asesoria_pkey", ["idPaquete"], { unique: true })
@Entity("paquetes_asesoria", { schema: "public" })
export class PaquetesAsesoria {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_paquete" })
  idPaquete: number;

  @Column("character varying", { name: "nombre", length: 100 })
  nombre: string;

  @Column("integer", { name: "cantidad_horas" })
  cantidadHoras: number;

  @Column("numeric", { name: "precio", precision: 10, scale: 2 })
  precio: string;

  @Column("numeric", {
    name: "descuento_porcentaje",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  descuentoPorcentaje: string | null;

  @Column("integer", { name: "vigencia_dias" })
  vigenciaDias: number;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;

  @Column("timestamp without time zone", {
    name: "fecha_creacion",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fechaCreacion: Date | null;

  @OneToMany(() => ComprasPaquete, (comprasPaquete) => comprasPaquete.idPaquete)
  comprasPaquetes: ComprasPaquete[];
}
