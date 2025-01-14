import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstitucionesResponse } from './interfaces/institutiones.interfaces';
import {
  Carrera,
  Institucion,
  Sede,
} from './interfaces/institutiones.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InstitucionesService {
  private readonly apiUrl = 'http://localhost:3000/institutions';

  constructor(private http: HttpClient) {}

  obtenerInstituciones(): Observable<InstitucionesResponse> {
    return this.http.get<InstitucionesResponse>(`${this.apiUrl}/`);
  }

  obtenerColegios(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.apiUrl}/`);
  }

  obtenerUniversidades(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(`${this.apiUrl}/`);
  }

  obtenerSedesPorInstitucion(institucionId: number): Observable<Sede[]> {
    return this.http.get<Sede[]>(
      `${this.apiUrl}/instituciones/${institucionId}/`
    );
  }

  obtenerCarrerasPorUniversidad(universidadId: number): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(
      `${this.apiUrl}/universidades/${universidadId}/`
    );
  }
}
