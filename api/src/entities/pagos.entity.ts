import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asesorias } from './asesorias.entity';
import { Estudiantes } from './estudiantes.entity';

@Entity('pagos')
export class Pagos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_pago' })
  idPago: number;

  @Column('numeric', {
    name: 'monto',
    precision: 10,
    scale: 2,
  })
  monto: string;

  @Column('enum', {
    name: 'estado',
    enum: ['pendiente', 'pagado', 'cancelado', 'reembolsado'],
  })
  estado: 'pendiente' | 'pagado' | 'cancelado' | 'reembolsado';

  @Column('timestamp without time zone', {
    name: 'fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column('timestamp without time zone', {
    name: 'fecha_pago',
    nullable: true,
  })
  fechaPago: Date | null;

  @Column('varchar', {
    name: 'metodo_pago',
    length: 50,
    nullable: true,
  })
  metodoPago: string | null;

  @Column('varchar', {
    name: 'referencia_pago',
    length: 100,
    nullable: true,
  })
  referenciaPago: string | null;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.pagos, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_asesoria', referencedColumnName: 'idAsesoria' }])
  idAsesoria: Promise<Asesorias>;

  @ManyToOne(() => Estudiantes, (estudiantes) => estudiantes.pagos, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_estudiante', referencedColumnName: 'idEstudiante' }])
  idEstudiante: Promise<Estudiantes>;
}
