import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("promociones_codigo_key", ["codigo"], { unique: true })
@Index("promociones_pkey", ["idPromocion"], { unique: true })
@Entity("promociones", { schema: "public" })
export class Promociones {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_promocion" })
  idPromocion: number;

  @Column("character varying", { name: "codigo", unique: true, length: 50 })
  codigo: string;

  @Column("character varying", { name: "tipo_descuento", length: 20 })
  tipoDescuento: string;

  @Column("numeric", { name: "valor_descuento", precision: 10, scale: 2 })
  valorDescuento: string;

  @Column("timestamp without time zone", { name: "fecha_inicio" })
  fechaInicio: Date;

  @Column("timestamp without time zone", { name: "fecha_fin" })
  fechaFin: Date;

  @Column("integer", { name: "usos_maximos", nullable: true })
  usosMaximos: number | null;

  @Column("integer", {
    name: "usos_actuales",
    nullable: true,
    default: () => "0",
  })
  usosActuales: number | null;

  @Column("text", { name: "condiciones", nullable: true })
  condiciones: string | null;

  @Column("boolean", { name: "activo", nullable: true, default: () => "true" })
  activo: boolean | null;
}
