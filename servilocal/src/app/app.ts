import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {Header} from './layouts/header/header';
import { Footer } from './layouts/footer/footer';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'servilocal';
  rutaActual = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.rutaActual = event.url;
      });
  }

  esLoginRegistro(): boolean {
    return this.rutaActual.includes('/login') || this.rutaActual.includes('/register');
  }
}