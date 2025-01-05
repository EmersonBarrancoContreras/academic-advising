import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asesorias } from './asesorias.entity';
import { Carreras } from './carreras.entity';
import { Colegios } from './colegios.entity';
import { SedesUniversitarias } from './sedesUniversitarias.entity';
import { Usuarios } from './usuarios.entity';
import { Evaluaciones } from './evaluaciones.entity';
import { Pagos } from './pagos.entity';

@Index('estudiantes_pkey', ['idEstudiante'], { unique: true })
@Entity('estudiantes', { schema: 'public' })
export class Estudiantes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_estudiante' })
  public idEstudiante: number;

  @Column('enum', {
    name: 'nivel_academico',
    enum: ['primaria', 'secundaria', 'universitario'],
  })
  public nivelAcademico: 'primaria' | 'secundaria' | 'universitario';

  @Column('integer', { name: 'grado_actual', nullable: true })
  public gradoActual: number | null;

  @Column('integer', { name: 'semestre_actual', nullable: true })
  public semestreActual: number | null;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idEstudiante, {
    lazy: true,
  })
  public asesorias: Promise<Asesorias[]>;

  @ManyToOne(() => Carreras, (carreras) => carreras.estudiantes, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_carrera', referencedColumnName: 'idCarrera' }])
  public idCarrera: Promise<Carreras>;

  @ManyToOne(() => Colegios, (colegios) => colegios.estudiantes, {
    onDelete: 'RESTRICT',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_colegio', referencedColumnName: 'idColegio' }])
  public idColegio: Promise<Colegios>;

  @ManyToOne(
    () => SedesUniversitarias,
    (sedesUniversitarias) => sedesUniversitarias.estudiantes,
    { onDelete: 'RESTRICT', lazy: true },
  )
  @JoinColumn([{ name: 'id_sede', referencedColumnName: 'idSede' }])
  public idSede: Promise<SedesUniversitarias>;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.estudiantes, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'idUsuario' }])
  public idUsuario: Promise<Usuarios>;

  @OneToMany(() => Evaluaciones, (evaluaciones) => evaluaciones.idEstudiante, {
    lazy: true,
  })
  evaluaciones: Promise<Evaluaciones[]>;

  @OneToMany(() => Pagos, (pagos) => pagos.idEstudiante, {
    lazy: true,
  })
  pagos: Promise<Pagos[]>;
}
