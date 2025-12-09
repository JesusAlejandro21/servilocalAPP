import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [NgIf, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  nombreUsuario: string | null = null;

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.nombreUsuario = localStorage.getItem('nombreUsuario');
      return true;
    }
    return false;
  }

  irLogin() {
    this.router.navigate(['site/login']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/']);
  }

}
