import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Estudiante,
  CreateEstudianteDto,
  UpdateEstudianteDto,
  PaginationDto,
  EstadisticasEstudiante,
  Asesoria,
} from './interfaces/estudiante.interfaces';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private readonly API_URL = 'http://localhost:3000/estudiantes';

  constructor(private http: HttpClient) {}

  create(createEstudianteDto: CreateEstudianteDto): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.API_URL, createEstudianteDto);
  }

  findAll(paginationDto?: PaginationDto): Observable<Estudiante[]> {
    let params = new HttpParams();
    if (paginationDto?.limit) {
      params = params.append('limit', paginationDto.limit.toString());
    }
    if (paginationDto?.offset) {
      params = params.append('offset', paginationDto.offset.toString());
    }
    return this.http.get<Estudiante[]>(this.API_URL, { params });
  }

  findOne(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.API_URL}/${id}`);
  }

  findByUserId(userId: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.API_URL}/usuario/${userId}`);
  }

  update(
    id: number,
    updateEstudianteDto: UpdateEstudianteDto
  ): Observable<Estudiante> {
    return this.http.patch<Estudiante>(
      `${this.API_URL}/${id}`,
      updateEstudianteDto
    );
  }

  getEstadisticas(id: number): Observable<EstadisticasEstudiante> {
    return this.http.get<EstadisticasEstudiante>(
      `${this.API_URL}/${id}/estadisticas`
    );
  }

  getAsesorias(id: number, estado?: string): Observable<Asesoria[]> {
    let params = new HttpParams();
    if (estado) {
      params = params.append('estado', estado);
    }
    return this.http.get<Asesoria[]>(`${this.API_URL}/${id}/asesorias`, {
      params,
    });
  }

  getAsesoriasProximas(id: number): Observable<Asesoria[]> {
    return this.http.get<Asesoria[]>(
      `${this.API_URL}/${id}/asesorias/proximas`
    );
  }
}
