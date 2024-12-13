//Angular
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//PrimeNG
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //Angular
    RouterOutlet,
    //PrimeNG
    ButtonModule,
    ToastModule,
    MessageModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  message = '';

  constructor() {}

  ngOnInit() {}
}
