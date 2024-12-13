import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Types & Enums
export type UserRole = 'estudiante' | 'asesor' | 'administrador';
export type NivelAcademico = 'primaria' | 'secundaria' | 'universitario';

// Interfaces
export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  nivelAcademico: NivelAcademico;
  gradoActual?: number;
  semestreActual?: number;
  idCarrera?: number;
  idColegio?: number;
  idSede?: number;
  rol: UserRole;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  nivelAcademico: NivelAcademico;
  gradoActual?: number;
  semestreActual?: number;
  idCarrera?: number;
  idColegio?: number;
  idSede?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user?: User;
}

export interface LoginResponse {
  message: string;
  accessToken: string; // Cambio aquí para coincidir con el backend
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Constants
  private readonly STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    REMEMBER_EMAIL: 'rememberedEmail',
  } as const;

  private readonly API_URL = 'http://localhost:3000/auth';
  private readonly VALID_ROLES: UserRole[] = [
    'estudiante',
    'asesor',
    'administrador',
  ];

  // Dependencies
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // State
  public authUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.authUser.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeStoredUser();
    }
  }

  // Storage Methods
  private getStorageItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setStorageItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error(`Error setting storage item for key ${key}:`, error);
      }
    }
  }

  private removeStorageItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  // Public Methods
  register(userData: RegisterData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.API_URL}/register`,
      userData
    );
  }

  login(loginData: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/login`, loginData)
      .pipe(
        tap((response) => {
          if (response && response.accessToken && response.user) {
            // Validación
            this.setAuthState({
              ...response,
              token: response.accessToken, // Asegurar estructura correcta
            });
          } else {
            console.error('Invalid login response structure:', response);
          }
        })
      );
  }

  googleLogin(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/google-login`, {})
      .pipe(
        tap((response) => {
          this.setAuthState(response);
        })
      );
  }

  logout(): void {
    this.authUser.next(null);
    if (isPlatformBrowser(this.platformId)) {
      Object.values(this.STORAGE_KEYS).forEach((key) => {
        this.removeStorageItem(key);
      });
    }
    void this.router.navigate(['/landing']);
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    try {
      const token = this.getToken();
      const user = this.getCurrentUser();
      return !!(token && user);
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      this.logout();
      return false;
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = this.getStorageItem(this.STORAGE_KEYS.TOKEN);
    if (!token || !this.isValidToken(token)) {
      return null;
    }
    return token;
  }

  getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const userStr = this.getStorageItem(this.STORAGE_KEYS.USER);

      if (!userStr) {
        return null;
      }

      const user = JSON.parse(userStr) as User;

      if (!this.isValidUser(user)) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  getDashboardRouteByRole(rol: UserRole): string {
    const routes: Record<UserRole, string> = {
      estudiante: '/dashboard-student',
      asesor: '/dashboard-advisor',
      administrador: '/dashboard-admin',
    };
    const route = routes[rol] || '/auth/login';
    return route;
  }

  // Email storage methods
  getStoredEmail(): string | null {
    return this.getStorageItem(this.STORAGE_KEYS.REMEMBER_EMAIL);
  }

  setStoredEmail(email: string): void {
    this.setStorageItem(this.STORAGE_KEYS.REMEMBER_EMAIL, email);
  }

  removeStoredEmail(): void {
    this.removeStorageItem(this.STORAGE_KEYS.REMEMBER_EMAIL);
  }

  // Private Methods
  private initializeStoredUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.getCurrentUser();
      if (user) {
        this.authUser.next(user);
      }
    }
  }

  private setAuthState(response: LoginResponse): void {
    try {
      // Actualizar el BehaviorSubject
      this.authUser.next(response.user);

      // Guardar en localStorage
      localStorage.setItem(this.STORAGE_KEYS.TOKEN, response.accessToken); // Cambio aquí
      localStorage.setItem(
        this.STORAGE_KEYS.USER,
        JSON.stringify(response.user)
      );
    } catch (error) {
      console.error('Error in setAuthState:', error);
    }
  }

  private clearStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.values(this.STORAGE_KEYS).forEach((key) => {
        this.removeStorageItem(key);
      });
    }
  }

  private isValidToken(token: string): boolean {
    return token.split('.').length === 3;
  }

  private isValidUser(user: unknown): user is User {
    if (!user || typeof user !== 'object') return false;

    const userObj = user as any;
    return (
      typeof userObj.id === 'number' &&
      typeof userObj.email === 'string' &&
      typeof userObj.nombre === 'string' &&
      typeof userObj.apellido === 'string' &&
      typeof userObj.rol === 'string' &&
      this.VALID_ROLES.includes(userObj.rol)
    );
  }
}
