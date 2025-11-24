import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })

export class workerService{

  public url: string;

  constructor(
    public _http: HttpClient
  ){

    this.url = environment.url;

  }

  getTrabajadores( ):Observable<any>{

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Token_de_autorizacion' );

    return this._http.get(
        this.url + "site/main",
        { headers: headers }
      );

  }

  /*getProducts( ):Observable<any>{

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Token_de_autorizacion' );

    return this._http.get(
        this.url + "store/store",
        { headers: headers }
      );

  }*/
}
