import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = signal(this.getInitialTheme() === 'dark');
  private defaultTheme = 'light';
  isDarkMode = this.darkMode.asReadonly();

  constructor() {
    this.setInitialTheme();
  }

  private getInitialTheme(): string {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('theme') || this.defaultTheme;
      } catch (error) {
        console.warn('No se pudo acceder a localStorage:', error);
        return this.defaultTheme;
      }
    }
    return this.defaultTheme;
  }

  private setInitialTheme() {
    const theme = this.getInitialTheme();
    this.applyTheme(theme);
  }

  private applyTheme(theme: string) {
    if (typeof window !== 'undefined') {
      try {
        // Guardar en localStorage
        localStorage.setItem('theme', theme);

        // Aplicar atributos y clases
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = theme;

        // Aplicar colores de fondo
        if (theme === 'dark') {
          document.body.style.backgroundColor = 'var(--surface-ground)';
          document.body.classList.add('dark-theme');
        } else {
          document.body.style.backgroundColor = 'var(--surface-ground)';
          document.body.classList.remove('dark-theme');
        }

        // Aplicar tema de PrimeNG
        const linkId = 'primeng-theme-link';
        let themeLink = document.getElementById(linkId) as HTMLLinkElement;

        if (!themeLink) {
          themeLink = document.createElement('link');
          themeLink.id = linkId;
          themeLink.rel = 'stylesheet';
          document.head.appendChild(themeLink);
        }

        themeLink.href = `/${theme === 'dark' ? 'lara-dark-blue' : 'lara-light-blue'}/theme.css`;
      } catch (error) {
        console.warn('Error al aplicar el tema:', error);
      }
    }
  }

  toggleTheme() {
    this.darkMode.update(dark => !dark);
    const theme = this.darkMode() ? 'dark' : 'light';
    this.applyTheme(theme);
  }

  // Métodos adicionales que podrías necesitar
  getCurrentTheme(): string {
    return this.darkMode() ? 'dark' : 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    this.darkMode.set(theme === 'dark');
    this.applyTheme(theme);
  }
}
