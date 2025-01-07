import { Component, ViewEncapsulation } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {}
