import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-information',
  imports: [NgIf],
  templateUrl: './information.html',
  styleUrl: './information.css'
})

export class Information {

  trabajador: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:5000/workers/information/${id}`).subscribe((res: any) => {
      this.trabajador = res.trabajador;
    });
  }
}