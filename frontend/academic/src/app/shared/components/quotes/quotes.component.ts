import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

interface Quote {
  text: string;
  author: string;
  description: string;
}

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class QuotesComponent implements OnInit, OnDestroy {
  
  currentQuoteIndex: number = 0;
  private subscription?: Subscription;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  quotes: Quote[] = [
    {
      text: 'La educación no es llenar un cubo, sino encender un fuego.',
      author: 'William Butler Yeats',
      description:
        'La asesoría académica busca inspirar y encender el deseo de aprender en lugar de solo transmitir información.',
    },
    {
      text: 'Enséñame y lo olvido, muéstrame y lo recuerdo, involúcrame y lo aprendo.',
      author: 'Benjamin Franklin',
      description:
        'Una buena asesoría académica no solo explica, sino que involucra al estudiante en el proceso de aprendizaje.',
    },
    {
      text: 'El aprendizaje es experiencia, todo lo demás es información.',
      author: 'Albert Einstein',
      description:
        'Una asesoría efectiva busca proporcionar experiencias que permitan al estudiante comprender y aplicar lo aprendido.',
    },
    {
      text: 'El objetivo principal de la educación es crear personas capaces de hacer cosas nuevas, no simplemente repetir lo que otras generaciones han hecho.',
      author: 'Jean Piaget',
      description:
        'Las asesorías académicas deben fomentar el pensamiento crítico y la innovación.',
    },
    {
      text: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.',
      author: 'Nelson Mandela',
      description:
        'Las asesorías académicas tienen un impacto significativo en el empoderamiento de los estudiantes y en la transformación de la sociedad.',
    },
    {
      text: 'Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el maravilloso mundo del saber.',
      author: 'Albert Einstein',
      description:
        'Las asesorías académicas deben transmitir este entusiasmo por el aprendizaje.',
    },
    {
      text: 'El buen maestro no es el que da respuestas, sino el que despierta en sus alumnos la curiosidad por aprender.',
      author: 'Albert Einstein',
      description:
        'El asesor académico debe inspirar la curiosidad y la búsqueda constante del conocimiento.',
    },
  ];

  ngOnInit() {
    if (this.isBrowser) {
      this.subscription = interval(5000)
        .pipe(takeWhile(() => this.isBrowser))
        .subscribe(() => {
          this.currentQuoteIndex =
            (this.currentQuoteIndex + 1) % this.quotes.length;
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
