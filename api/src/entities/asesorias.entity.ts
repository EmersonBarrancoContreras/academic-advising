import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asesores } from './asesores.entity';
import { Estudiantes } from './estudiantes.entity';
import { Materias } from './materias.entity';
import { Evaluaciones } from './evaluaciones.entity';
import { Pagos } from './pagos.entity';

@Index('idx_asesorias_estado', ['estado'], {})
@Index('idx_asesorias_fecha', ['fechaHoraInicio'], {})
@Index('asesorias_pkey', ['idAsesoria'], { unique: true })
@Entity('asesorias', { schema: 'public' })
export class Asesorias {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_asesoria' })
  public idAsesoria: number;

  @Column('timestamp without time zone', { name: 'fecha_hora_inicio' })
  public fechaHoraInicio: Date;

  @Column('timestamp without time zone', { name: 'fecha_hora_fin' })
  public fechaHoraFin: Date;

  @Column('enum', {
    name: 'estado',
    enum: ['programada', 'completada', 'cancelada'],
  })
  public estado: 'programada' | 'completada' | 'cancelada';

  @Column('character varying', {
    name: 'link_videoconferencia',
    nullable: true,
    length: 255,
  })
  public linkVideoconferencia: string | null;

  @Column('text', { name: 'notas', nullable: true })
  public notas: string | null;

  @Column('timestamp without time zone', {
    name: 'fecha_registro',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public fechaRegistro: Date | null;

  @Column('numeric', { name: 'costo', nullable: true, precision: 10, scale: 2 })
  public costo: string | null;

  @Column('character varying', {
    name: 'modalidad',
    nullable: true,
    length: 50,
  })
  public modalidad: string | null;

  @Column('character varying', {
    name: 'url_grabacion',
    nullable: true,
    length: 255,
  })
  public urlGrabacion: string | null;

  @ManyToOne(() => Asesores, (asesores) => asesores.asesorias, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_asesor', referencedColumnName: 'idAsesor' }])
  public idAsesor: Promise<Asesores>;

  @ManyToOne(() => Estudiantes, (estudiantes) => estudiantes.asesorias, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_estudiante', referencedColumnName: 'idEstudiante' }])
  public idEstudiante: Promise<Estudiantes>;

  @ManyToOne(() => Materias, (materias) => materias.asesorias, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_materia', referencedColumnName: 'idMateria' }])
  public idMateria: Promise<Materias>;
  @OneToMany(() => Evaluaciones, (evaluaciones) => evaluaciones.idAsesoria, {
    lazy: true,
  })
  evaluaciones: Promise<Evaluaciones[]>;

  @OneToMany(() => Pagos, (pagos) => pagos.idAsesoria, {
    lazy: true,
  })
  pagos: Promise<Pagos[]>;
}
