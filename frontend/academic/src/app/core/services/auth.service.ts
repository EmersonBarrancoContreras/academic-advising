import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Types
export type UserRole = 'estudiante' | 'asesor' | 'administrador';
export type NivelAcademico = 'primaria' | 'secundaria' | 'universitario';

// Interfaces
export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  nivelAcademico?: NivelAcademico;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  nombre: string;
  apellido: string;
  rol: UserRole;
  nivelAcademico: NivelAcademico;
  gradoActual?: number;
  semestreActual?: number;
  idCarrera?: number;
  idColegio?: number;
  idSede?: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private readonly STORAGE = {
    TOKEN: 'token',
    USER: 'user',
    EMAIL: 'rememberedEmail',
  } as const;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly authUser = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this.authUser.asObservable();

  constructor() {
    if (this.isBrowser) {
      const user = this.getStoredUser();
      if (user) this.authUser.next(user);
    }
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, data)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(tap((response) => this.handleAuthResponse(response)));
  }

  logout(): void {
    this.authUser.next(null);
    if (this.isBrowser) {
      Object.values(this.STORAGE).forEach((key) =>
        localStorage.removeItem(key)
      );
    }
    void this.router.navigate(['/landing']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!this.getStoredToken() && !!this.authUser.value;
  }

  getDashboardRoute(
    rol: UserRole = this.authUser.value?.rol ?? 'estudiante'
  ): string {
    const routes: Record<UserRole, string> = {
      estudiante: '/dashboard-student',
      asesor: '/dashboard-advisor',
      administrador: '/dashboard-admin',
    };
    return routes[rol] || '/auth/login';
  }

  getStoredToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.STORAGE.TOKEN) : null;
  }

  getStoredEmail(): string | null {
    return this.isBrowser ? localStorage.getItem(this.STORAGE.EMAIL) : null;
  }

  setStoredEmail(email: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE.EMAIL, email);
    }
  }

  removeStoredEmail(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE.EMAIL);
    }
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) return null;

    try {
      const userStr = localStorage.getItem(this.STORAGE.USER);
      if (!userStr) return null;

      const user = JSON.parse(userStr) as User;
      return this.validateUser(user) ? user : null;
    } catch {
      localStorage.removeItem(this.STORAGE.USER);
      return null;
    }
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (!this.validateAuthResponse(response)) {
      console.error('Invalid auth response:', response);
      return;
    }

    this.authUser.next(response.user);

    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE.TOKEN, response.accessToken);
      localStorage.setItem(this.STORAGE.USER, JSON.stringify(response.user));
    }
  }

  private validateUser(user: unknown): user is User {
    if (!user || typeof user !== 'object') return false;

    const { id, email, nombre, apellido, rol } = user as User;
    return !!(
      typeof id === 'number' &&
      typeof email === 'string' &&
      typeof nombre === 'string' &&
      typeof apellido === 'string' &&
      ['estudiante', 'asesor', 'administrador'].includes(rol)
    );
  }

  private validateAuthResponse(response: unknown): response is AuthResponse {
    if (!response || typeof response !== 'object') return false;

    const { accessToken, user } = response as AuthResponse;
    return !!(typeof accessToken === 'string' && this.validateUser(user));
  }
}
