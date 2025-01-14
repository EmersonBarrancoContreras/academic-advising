import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from "@shared/components/side-menu/side-menu.component";
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-dashboard-advisor',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, HeaderComponent],
  templateUrl: './dashboard-advisor.component.html',
  styleUrl: './dashboard-advisor.component.scss',
})
export default class DashboardAdvisorComponent {}
