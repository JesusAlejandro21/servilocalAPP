import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Menu } from '../menu/menu';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [Menu, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
   mostrarCarrusel = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // Oculta el carrusel cuando la URL contiene "information"
      this.mostrarCarrusel = !this.router.url.includes('/information/');
    });
  }

}
