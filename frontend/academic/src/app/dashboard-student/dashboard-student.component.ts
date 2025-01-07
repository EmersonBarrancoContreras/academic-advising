import { MenuComponent } from './../shared/components/menu/menu.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MenuModule } from 'primeng/menu';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NotificationComponent } from "../shared/components/notification/notification.component";

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MenuModule,
    MenuComponent,
    FooterComponent,
    NotificationComponent
],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss',
})
export default class DashboardStudentComponent {}
