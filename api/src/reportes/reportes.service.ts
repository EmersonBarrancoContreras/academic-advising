// src/reportes/reportes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reportes } from '../entities/reportes.entity';
import { GenerateReporteDto } from './dto/generate-reporte.dto';
import { AsesoriasService } from '../asesorias/asesorias.service';
import { PagosService } from '../pagos/pagos.service';
import { EstudiantesService } from '../estudiante/estudiante.service';
import { AsesoresService } from '../asesores/asesores.service';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reportes)
    private reportesRepository: Repository<Reportes>,
    private asesoriasService: AsesoriasService,
    private pagosService: PagosService,
    private estudiantesService: EstudiantesService,
    private asesoresService: AsesoresService,
  ) {}

  async generate(generateReporteDto: GenerateReporteDto, idUsuario: number) {
    let datos: any;

    switch (generateReporteDto.tipo) {
      case 'asesorias':
        datos = await this.generarReporteAsesorias(
          generateReporteDto.fechaInicio,
          generateReporteDto.fechaFin,
          generateReporteDto.filtros,
        );
        break;
      case 'pagos':
        datos = await this.generarReportePagos(
          generateReporteDto.fechaInicio,
          generateReporteDto.fechaFin,
        );
        break;
      case 'usuarios':
        datos = await this.generarReporteUsuarios();
        break;
      case 'rendimiento':
        datos = await this.generarReporteRendimiento(); // Quitamos los argumentos
        break;
      case 'general':
        datos = await this.generarReporteGeneral();
        break;
    }

    const reporte = new Reportes();
    reporte.titulo = generateReporteDto.titulo;
    reporte.descripcion = generateReporteDto.descripcion;
    reporte.tipo = generateReporteDto.tipo;
    reporte.datos = datos;
    reporte.idUsuarioGenerador = Promise.resolve({ idUsuario } as any);

    return this.reportesRepository.save(reporte);
  }

  async findAll() {
    return this.reportesRepository.find({
      order: { fechaGeneracion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const reporte = await this.reportesRepository.findOne({
      where: { idReporte: id },
    });

    if (!reporte) {
      throw new NotFoundException('Reporte no encontrado');
    }

    return reporte;
  }

  async findByType(
    tipo: 'asesorias' | 'pagos' | 'usuarios' | 'rendimiento' | 'general',
  ) {
    return this.reportesRepository.find({
      where: { tipo },
      order: { fechaGeneracion: 'DESC' },
    });
  }

  private async generarReporteAsesorias(
    fechaInicio?: Date,
    fechaFin?: Date,
    filtros?: any,
  ) {
    const asesorias = await this.asesoriasService.findAll({});

    return {
      totalAsesorias: asesorias.length,
      porEstado: {
        programadas: asesorias.filter((a) => a.estado === 'programada').length,
        completadas: asesorias.filter((a) => a.estado === 'completada').length,
        canceladas: asesorias.filter((a) => a.estado === 'cancelada').length,
      },
      promedioCalificacion: this.calcularPromedioCalificaciones(asesorias),
      distribucionPorMateria: this.agruparPorMateria(asesorias),
      tendenciaMensual: this.calcularTendenciaMensual(asesorias),
    };
  }

  private async generarReportePagos(fechaInicio?: Date, fechaFin?: Date) {
    const pagos = await this.pagosService.findAll({
      fechaInicio,
      fechaFin,
    });

    return {
      totalPagos: pagos.length,
      montoTotal: this.calcularMontoTotal(pagos),
      porEstado: {
        pendientes: pagos.filter((p) => p.estado === 'pendiente').length,
        completados: pagos.filter((p) => p.estado === 'pagado').length,
        cancelados: pagos.filter((p) => p.estado === 'cancelado').length,
      },
      tendenciaMensual: this.calcularTendenciaPagos(pagos),
    };
  }

  private async generarReporteUsuarios() {
    const estudiantes = await this.estudiantesService.findAll({});
    const asesores = await this.asesoresService.findAll({});

    return {
      estudiantes: {
        total: estudiantes.total,
        porNivel: this.agruparPorNivel(estudiantes.estudiantes),
        nuevosUltimoMes: this.contarNuevosUsuarios(estudiantes.estudiantes),
      },
      asesores: {
        total: asesores.length,
        validados: asesores.filter((a) => a.estadoValidacion).length,
        promedioCalificacion:
          this.calcularPromedioCalificacionesAsesores(asesores),
      },
    };
  }

  private async generarReporteRendimiento() {
    // Quitamos los parámetros que no se usan
    const asesorias = await this.asesoriasService.findAll({});
    const asesores = await this.asesoresService.findAll({});

    return {
      tasaCompletitud: this.calcularTasaCompletitud(asesorias),
      rendimientoAsesores: this.calcularRendimientoAsesores(asesores),
      satisfaccionEstudiantes: await this.calcularSatisfaccionEstudiantes(),
      metricas: {
        asesoriasPromedioPorDia:
          this.calcularAsesoriasPromedioPorDia(asesorias),
        duracionPromedioAsesorias: this.calcularDuracionPromedio(asesorias),
      },
    };
  }

  private async generarReporteGeneral() {
    return {
      usuarios: await this.generarReporteUsuarios(),
      asesorias: await this.generarReporteAsesorias(),
      pagos: await this.generarReportePagos(),
      rendimiento: await this.generarReporteRendimiento(),
    };
  }

  // Métodos de cálculo
  private calcularRendimientoAsesores(asesores: any[]) {
    return asesores.map((asesor) => ({
      id: asesor.idAsesor,
      nombre: `${asesor.idUsuario.nombre} ${asesor.idUsuario.apellido}`,
      metricas: {
        totalAsesorias: asesor.asesorias?.length || 0,
        completadas:
          asesor.asesorias?.filter((a) => a.estado === 'completada').length ||
          0,
        calificacionPromedio: this.calcularPromedioCalificacionesAsesor(asesor),
        tasaCompletitud: this.calcularTasaCompletitudAsesor(asesor),
        horasTotales: this.calcularHorasTotalesAsesor(asesor),
      },
    }));
  }

  private calcularPromedioCalificaciones(asesorias: any[]) {
    const asesoriasCalificadas = asesorias.filter((a) => a.calificacion);
    return asesoriasCalificadas.length > 0
      ? asesoriasCalificadas.reduce((sum, a) => sum + a.calificacion, 0) /
          asesoriasCalificadas.length
      : 0;
  }

  private calcularPromedioCalificacionesAsesor(asesor: any) {
    const asesoriasCalificadas =
      asesor.asesorias?.filter(
        (a) => a.estado === 'completada' && a.calificacion,
      ) || [];
    return asesoriasCalificadas.length > 0
      ? asesoriasCalificadas.reduce(
          (sum, a) => sum + Number(a.calificacion),
          0,
        ) / asesoriasCalificadas.length
      : 0;
  }

  private calcularTasaCompletitudAsesor(asesor: any) {
    if (!asesor.asesorias?.length) return 0;
    const completadas = asesor.asesorias.filter(
      (a) => a.estado === 'completada',
    ).length;
    return (completadas / asesor.asesorias.length) * 100;
  }

  private calcularHorasTotalesAsesor(asesor: any) {
    if (!asesor.asesorias?.length) return 0;

    return asesor.asesorias
      .filter((a) => a.estado === 'completada')
      .reduce((total, asesoria) => {
        const duracion =
          new Date(asesoria.fechaHoraFin).getTime() -
          new Date(asesoria.fechaHoraInicio).getTime();
        return total + duracion / (1000 * 60 * 60); // Convertir a horas
      }, 0);
  }

  private async calcularSatisfaccionEstudiantes() {
    return {
      satisfaccionGeneral: 0,
      porcentajeRecomendacion: 0,
      comentariosPositivos: 0,
      aspectosMejora: [],
    };
  }

  private agruparPorMateria(asesorias: any[]) {
    return asesorias.reduce((acc, asesoria) => {
      const materia = asesoria.materia?.nombre || 'Sin materia';
      acc[materia] = (acc[materia] || 0) + 1;
      return acc;
    }, {});
  }

  private calcularTendenciaMensual(items: any[]) {
    const tendencia = {};
    // Implementar lógica para calcular tendencia mensual
    return tendencia;
  }

  private calcularTendenciaPagos(pagos: any[]) {
    const tendencia = {};
    // Implementar lógica para calcular tendencia de pagos
    return tendencia;
  }

  private calcularMontoTotal(pagos: any[]) {
    return pagos.reduce((sum, pago) => sum + Number(pago.monto), 0);
  }

  private agruparPorNivel(estudiantes: any[]) {
    return estudiantes.reduce((acc, est) => {
      acc[est.nivelAcademico] = (acc[est.nivelAcademico] || 0) + 1;
      return acc;
    }, {});
  }

  private contarNuevosUsuarios(usuarios: any[]) {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    return usuarios.filter((u) => new Date(u.fechaRegistro) >= unMesAtras)
      .length;
  }

  private calcularPromedioCalificacionesAsesores(asesores: any[]) {
    const asesoresCalificados = asesores.filter((a) => a.calificacionPromedio);
    return asesoresCalificados.length > 0
      ? asesoresCalificados.reduce(
          (sum, a) => sum + Number(a.calificacionPromedio),
          0,
        ) / asesoresCalificados.length
      : 0;
  }

  private calcularTasaCompletitud(asesorias: any[]) {
    const completadas = asesorias.filter(
      (a) => a.estado === 'completada',
    ).length;
    return asesorias.length > 0 ? (completadas / asesorias.length) * 100 : 0;
  }

  private calcularAsesoriasPromedioPorDia(asesorias: any[]) {
    if (asesorias.length === 0) return 0;

    const primerAsesoria = new Date(
      Math.min(...asesorias.map((a) => new Date(a.fechaHoraInicio).getTime())),
    );
    const ultimaAsesoria = new Date(
      Math.max(...asesorias.map((a) => new Date(a.fechaHoraInicio).getTime())),
    );

    const diasTotales = Math.ceil(
      (ultimaAsesoria.getTime() - primerAsesoria.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return diasTotales > 0 ? asesorias.length / diasTotales : asesorias.length;
  }

  private calcularDuracionPromedio(asesorias: any[]) {
    const asesoriasCompletadas = asesorias.filter(
      (a) => a.estado === 'completada',
    );
    if (asesoriasCompletadas.length === 0) return 0;

    const duracionTotal = asesoriasCompletadas.reduce((sum, a) => {
      const duracion =
        new Date(a.fechaHoraFin).getTime() -
        new Date(a.fechaHoraInicio).getTime();
      return sum + duracion;
    }, 0);

    return duracionTotal / asesoriasCompletadas.length / (1000 * 60); // Retorna minutos
  }
}
