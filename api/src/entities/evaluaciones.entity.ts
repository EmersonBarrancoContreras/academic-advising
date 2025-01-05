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
import { Asesores } from './asesores.entity';

@Entity('evaluaciones')
export class Evaluaciones {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_evaluacion' })
  idEvaluacion: number;

  @Column('numeric', {
    name: 'calificacion',
    precision: 2,
    scale: 1,
  })
  calificacion: number;

  @Column('text', {
    name: 'comentario',
    nullable: true,
  })
  comentario: string | null;

  @Column('timestamp without time zone', {
    name: 'fecha_evaluacion',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaEvaluacion: Date;

  @Column('text', {
    name: 'aspectos_destacados',
    nullable: true,
  })
  aspectosDestacados: string | null;

  @Column('text', {
    name: 'aspectos_mejora',
    nullable: true,
  })
  aspectosMejora: string | null;

  @ManyToOne(() => Asesorias, (asesorias) => asesorias.evaluaciones, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_asesoria', referencedColumnName: 'idAsesoria' }])
  idAsesoria: Promise<Asesorias>;

  @ManyToOne(() => Estudiantes, (estudiantes) => estudiantes.evaluaciones, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_estudiante', referencedColumnName: 'idEstudiante' }])
  idEstudiante: Promise<Estudiantes>;

  @ManyToOne(() => Asesores, (asesores) => asesores.evaluaciones, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_asesor', referencedColumnName: 'idAsesor' }])
  idAsesor: Promise<Asesores>;
}
