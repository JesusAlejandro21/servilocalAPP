import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Login } from '../login/login';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  tipo: 'usuario' | 'trabajador' = 'usuario';
  form: any = {};

  constructor(private _authService: AuthService, private router: Router) {}

  registrar() {
    const datos = { ...this.form, tipo: this.tipo };
    this._authService.register(datos).subscribe({
      next: (res: any) => {
        alert(res.mensaje || 'Registro exitoso');
        this.router.navigate(['/']);
      },
      error: err => alert(err.error.error || 'Error al registrar')
    });
  }

}
