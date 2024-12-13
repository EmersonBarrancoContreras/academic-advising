import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Universidad {
  id: number;
  nombre: string;
  ciudad: string;
  direccion?: string;
  sedes: Sede[];
  carreras: Carrera[];
}

interface Colegio {
  id: number;
  nombre: string;
  ciudad: string;
  direccion?: string;
}

interface Sede {
  id: number;
  nombre: string;
  ciudad: string;
  direccion: string;
}

interface Carrera {
  id: number;
  nombre: string;
  numeroSemestres: number;
}

interface InstitucionesResponse {
  universidades: Universidad[];
  colegios: Colegio[];
}

@Injectable({
  providedIn: 'root',
})
export class InstitucionesService {
  private readonly apiUrl = 'http://localhost:3000/institutions';

  constructor(private http: HttpClient) {}

  obtenerInstituciones(): Observable<InstitucionesResponse> {
    return this.http.get<InstitucionesResponse>(this.apiUrl);
  }
}
