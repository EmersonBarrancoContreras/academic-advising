import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity('reportes')
export class Reportes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_reporte' })
  idReporte: number;

  @Column('varchar', { length: 100 })
  titulo: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('jsonb')
  datos: object;

  @Column('enum', {
    name: 'tipo',
    enum: ['asesorias', 'pagos', 'usuarios', 'rendimiento', 'general'],
  })
  tipo: 'asesorias' | 'pagos' | 'usuarios' | 'rendimiento' | 'general';

  @CreateDateColumn({
    name: 'fecha_generacion',
  })
  fechaGeneracion: Date;

  @ManyToOne(() => Usuarios)
  @JoinColumn([
    { name: 'id_usuario_generador', referencedColumnName: 'idUsuario' },
  ])
  idUsuarioGenerador: Promise<Usuarios>;
}
