import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient); //Inyectamos un servicio - http client
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  //*Obtener todos los usuarios
  public obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  //*Obtener un usuario
  public obtenerUsuario(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }
}
