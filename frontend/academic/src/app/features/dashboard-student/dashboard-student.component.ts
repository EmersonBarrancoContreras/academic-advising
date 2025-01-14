import { MenuComponent } from '@shared/components/menu/menu.component';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MenuModule } from 'primeng/menu';
import { NotificationComponent } from '@shared/components/notification/notification.component';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MenuModule,
    MenuComponent,
    NotificationComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss',
})
export default class DashboardStudentComponent implements OnInit, OnDestroy {
  showNotifications = true;
  menuVisible = true;
  private routerSubscription: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        const currentRoute = event.urlAfterRedirects;

        this.showNotifications = this.isHomeRoute(currentRoute);
        // Forzar detección de cambios
        this.cdr.detectChanges();
      });
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    this.showNotifications = this.isHomeRoute(currentUrl);
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onMenuToggle(visible: boolean) {
    this.menuVisible = visible;
    this.cdr.detectChanges();
  }

  private isHomeRoute(route: string): boolean {
    const homeRoutes = [
      '/dashboard-student',
      '/dashboard-student/',
      '/dashboard-student/home'
    ];
    return homeRoutes.includes(route);
  }
}
