import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser: Usuario | null = null;
  private readonly dataUrl = 'data/data.json';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<Usuario[]>(this.dataUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.loggedInUser = user;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);  // En caso de error, retorna false.
      })
    );
  }

  getLoggedInUser(): Usuario | null {
    return this.loggedInUser;
  }
}