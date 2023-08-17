import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICliente } from 'src/app/interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(cpf: string): Observable<boolean> {
    return this.http.get<ICliente>(`http://localhost:8080/treinamento/rest/clientes/buscarPorCpf/${cpf}`).pipe(
      map((client: ICliente) => {
        if (client && client.ativo) {
          this.isAuthenticated = true;
          return true;
        } else {
          this.isAuthenticated = false;
          return false;
        }
      }),
      catchError(error => {
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    // Implemente a lógica específica de logout aqui, por exemplo, limpar tokens ou informações de usuário.
    // Por enquanto, estamos apenas marcando isAuthenticated como false.
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
