import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { Asesorias } from './asesorias.entity';
import { EspecializacionesAsesor } from './especializacionesAsesor.entity';
import { Materias } from './materias.entity';
import { MateriasAsesor } from './materiasAsesor.entity';
import { Evaluaciones } from './evaluaciones.entity';

@Index('asesores_pkey', ['idAsesor'], { unique: true })
@Entity('asesores', { schema: 'public' })
export class Asesores {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_asesor' })
  public idAsesor: number;

  @Column('numeric', {
    name: 'calificacion_promedio',
    nullable: true,
    precision: 3,
    scale: 2,
  })
  public calificacionPromedio: string | null;

  @Column('boolean', {
    name: 'estado_validacion',
    nullable: true,
    default: () => 'false',
  })
  public estadoValidacion: boolean | null;

  @Column('text', { name: 'descripcion_perfil', nullable: true })
  public descripcionPerfil: string | null;

  @Column('timestamp without time zone', {
    name: 'fecha_validacion',
    nullable: true,
  })
  public fechaValidacion: Date | null;

  @Column('numeric', {
    name: 'tarifa_hora',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  public tarifaHora: string | null;

  @Column('integer', { name: 'experiencia_anios', nullable: true })
  public experienciaAnios: number | null;

  @Column('character varying', {
    name: 'titulo_profesional',
    nullable: true,
    length: 255,
  })
  public tituloProfesional: string | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.asesores, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  @JoinColumn([{ name: 'id_usuario', referencedColumnName: 'idUsuario' }])
  public idUsuario: Promise<Usuarios>;

  @OneToMany(() => Asesorias, (asesorias) => asesorias.idAsesor, { lazy: true })
  public asesorias: Promise<Asesorias[]>;

  @OneToMany(
    () => EspecializacionesAsesor,
    (especializacionesAsesor) => especializacionesAsesor.idAsesor2,
    { lazy: true },
  )
  public especializacionesAsesor: Promise<EspecializacionesAsesor[]>;

  @OneToMany(() => Materias, (materias) => materias.idAsesor, { lazy: true })
  public materias: Promise<Materias[]>;

  @OneToMany(
    () => MateriasAsesor,
    (materiasAsesor) => materiasAsesor.idAsesor2,
    { lazy: true },
  )
  public materiasAsesor: Promise<MateriasAsesor[]>;

  @OneToMany(() => Evaluaciones, (evaluaciones) => evaluaciones.idAsesor, {
    lazy: true,
  })
  evaluaciones: Promise<Evaluaciones[]>;
}
