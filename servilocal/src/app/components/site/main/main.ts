import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { workerService } from '../../../services/worker.service';


@Component({
  selector: 'app-main',
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  //public products = null;
    public trabajadores: any[] = [];
  
    constructor(
      private _workerService: workerService
    ){
      //this.getProducts();
      this.getTrabajadores();
    }
  
    async getTrabajadores() {
  
      this._workerService.getTrabajadores( ).subscribe({
        next: (response) => {
          
          if (response.status === 'success') {
            console.log('Se registro exitosamente');
            console.log(response.lista_trabajadores);
            this.trabajadores = response.lista_trabajadores;
          } else {
            console.log('Ocurrio un Problema');
            console.log(response.mensaje);
          }
        },
        
        error: (e) => {
          let msg = e.error ? e.error.message : e.message;
          console.log('Ocurrio un Error:' + msg);
        },
      });
    }

    favoritos: number[] = [];

ngOnInit() {
  this.cargarFavoritos();
}

cargarFavoritos() {
  const saved = localStorage.getItem('favoritos');
  this.favoritos = saved ? JSON.parse(saved).map((x: any) => Number(x)) : [];
}

guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
}

esFavorito(id: number): boolean {
  return this.favoritos.includes(id);
}

toggleFavorito(id: number) {
  if (this.esFavorito(id)) {
    this.favoritos = this.favoritos.filter(f => f !== id);
  } else {
    this.favoritos.push(id);
  }
  this.guardarFavoritos();
}
}
