import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = signal(false);
  private defaultTheme = 'light';
  isDarkMode = this.darkMode.asReadonly();

  constructor() {
    this.setInitialTheme();
  }

  private setInitialTheme() {
    // Removemos cualquier tema guardado
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
          document.documentElement.setAttribute(
            'data-theme',
            this.defaultTheme
          );
        }
      } catch (error) {
        console.warn('No se pudo acceder a localStorage:', error);
        document.documentElement.setAttribute('data-theme', this.defaultTheme);
      }
    }
  }

  toggleTheme() {
    this.darkMode.update((dark) => !dark);
    const theme = this.darkMode() ? 'dark' : 'light';
    document.body.className = theme;

    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1e1e1e';
    } else {
      document.body.style.backgroundColor = '#ffffff';
    }
  }
}
