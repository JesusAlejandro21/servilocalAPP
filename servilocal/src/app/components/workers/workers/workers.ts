import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { workerService } from '../../../services/worker.service';

@Component({
  selector: 'app-workers',
  imports: [RouterLink],
  templateUrl: './workers.html',
  styleUrl: './workers.css'
})
export class Workers {
  public trabajadores: any[] = [];

  //public products = null;
  //public trabajadores = null;

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

}
