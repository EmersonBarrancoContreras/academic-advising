import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity('notificaciones')
export class Notificaciones {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_notificacion' })
  idNotificacion: number;

  @Column('varchar', { length: 255 })
  titulo: string;

  @Column('text')
  mensaje: string;

  @Column('enum', {
    name: 'tipo',
    enum: ['asesoria', 'sistema', 'pago', 'recordatorio'],
  })
  tipo: 'asesoria' | 'sistema' | 'pago' | 'recordatorio';

  @Column('boolean', { default: false })
  leida: boolean;

  @Column('timestamp without time zone', {
    name: 'fecha_creacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @Column('timestamp without time zone', {
    name: 'fecha_lectura',
    nullable: true,
  })
  fechaLectura: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.notificaciones, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'idUsuario' }])
  idUsuario: Promise<Usuarios>;
}
