import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from "../shared/components/side-menu/side-menu.component";
import { HeaderComponent } from "../shared/components/header/header.component";

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, HeaderComponent],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss',
})
export default class DashboardStudentComponent {}
