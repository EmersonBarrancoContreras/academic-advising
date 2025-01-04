import { MenuComponent } from './../shared/components/menu/menu.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MenuModule } from 'primeng/menu';
import { FooterComponent } from '@shared/components/footer/footer.component';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MenuModule,
    MenuComponent,
    FooterComponent,
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss',
})
export default class DashboardStudentComponent {}
