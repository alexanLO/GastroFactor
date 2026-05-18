import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../env/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly uriApiLogin = `${environment.baseAddress}/v1/login`;
  private readonly uriApiRegister = `${environment.baseAddress}/v1/register`;

  constructor(
    private http: HttpClient,
    private log: NGXLogger,
  ) {}

  /**
   * Envia os dados do formulário de login de usuário para o backend
   * @param request - Dados do formulário (email, password)
   * @returns Observable com token de acesso e refresh token
   */
  userLogin(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.uriApiLogin, request).pipe(
      tap((response) => {
        this.log.info('Login realizado com sucesso.');
      }),
    );
  }

  /**
   * Envia os dados do formulário de cadastro de usuário para o backend
   * @param request - Dados do formulário (name, email, password, profession)
   * @returns Observable com token de acesso e refresh token
   */
  userRegister(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.uriApiRegister, request).pipe(
      tap((response) => {
        this.log.info('Usuário cadastrado com sucesso.');
      }),
    );
  }
}
