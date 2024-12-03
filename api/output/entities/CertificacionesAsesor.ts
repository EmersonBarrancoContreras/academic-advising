import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Asesores } from "./Asesores";
import { Usuarios } from "./Usuarios";

@Index("certificaciones_asesor_pkey", ["idCertificacion"], { unique: true })
@Entity("certificaciones_asesor", { schema: "public" })
export class CertificacionesAsesor {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_certificacion" })
  idCertificacion: number;

  @Column("character varying", { name: "nombre_certificacion", length: 255 })
  nombreCertificacion: string;

  @Column("character varying", { name: "institucion_emisora", length: 255 })
  institucionEmisora: string;

  @Column("date", { name: "fecha_emision" })
  fechaEmision: string;

  @Column("date", { name: "fecha_vencimiento", nullable: true })
  fechaVencimiento: string | null;

  @Column("character varying", {
    name: "url_documento",
    nullable: true,
    length: 255,
  })
  urlDocumento: string | null;

  @Column("character varying", {
    name: "estado_verificacion",
    nullable: true,
    length: 50,
    default: () => "'pendiente'",
  })
  estadoVerificacion: string | null;

  @Column("timestamp without time zone", {
    name: "fecha_verificacion",
    nullable: true,
  })
  fechaVerificacion: Date | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.certificacionesAsesors)
  @JoinColumn([{ name: "id_asesor", referencedColumnName: "idAsesor" }])
  idAsesor: Asesores;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.certificacionesAsesors)
  @JoinColumn([{ name: "verificado_por", referencedColumnName: "idUsuario" }])
  verificadoPor: Usuarios;
}
