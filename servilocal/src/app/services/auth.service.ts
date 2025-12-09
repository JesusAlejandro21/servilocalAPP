import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'https://servilocalapi2.onrender.com/';

  constructor(private http: HttpClient) {}

  login(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, datos).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipo', datos.tipo);
        }
      })
    );
  }

  register(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, datos);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  }
}
