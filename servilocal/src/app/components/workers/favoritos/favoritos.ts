import { Component } from '@angular/core';
import { workerService } from '../../../services/worker.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos {

  favoritos: number[] = [];
  trabajadoresFavoritos: any[] = [];

  constructor(private api: workerService) {}

  ngOnInit() {
    this.cargarFavoritos();
    this.cargarTrabajadoresFavoritos();
  }

  cargarFavoritos() {
    const saved = localStorage.getItem('favoritos');
    this.favoritos = saved ? JSON.parse(saved).map((x: any) => Number(x)) : [];
  }

  cargarTrabajadoresFavoritos() {
    this.api.getTrabajadores().subscribe((response: any) => {

      const lista = response.lista_trabajadores;  // <--- ESTA ES LA CORRECCIÓN

      this.trabajadoresFavoritos = lista.filter(
        (t: any) => this.favoritos.includes(Number(t.id_trabajador))
      );
    });
  }

}
