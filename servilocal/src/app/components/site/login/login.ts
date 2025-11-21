import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  tipo: 'usuario' | 'trabajador' = 'usuario';
  form: any = {};

  constructor(private authService: AuthService, private router: Router){}

  iniciarSesion() {
    const datos = { ...this.form, tipo: this.tipo};
    this.authService.login(datos).subscribe({
      next:(res:any) => {
        alert(`Bienvenido ${this.tipo}`);
        this.router.navigate(['/']);
      },
      error: err => alert(err.error.error || 'Error al iniciar sesion')
    });
  }
}
