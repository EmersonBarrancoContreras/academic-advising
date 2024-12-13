import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    const allowedRole = route.data?.['rol'];

    return this.authService.authUser.pipe(
      take(1), // Tomar solo el primer valor
      map((currentUser) => {
        if (!currentUser) {
          return this.router.createUrlTree(['/auth/login']);
        }

        if (currentUser.rol === allowedRole) {
          return true;
        }

        const correctDashboard = this.authService.getDashboardRouteByRole(
          currentUser.rol
        );
        return this.router.createUrlTree([correctDashboard]);
      })
    );
  }
}
