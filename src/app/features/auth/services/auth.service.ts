import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../env/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../../shared/models/auth.model';

/**
 * Serviço responsável pela comunicação com o backend Spring Boot
 * para registrar e logar um usuario
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly uriApiLogin = `${environment.baseAddress}/v1/auth/login`;
  private readonly uriApiRegister = `${environment.baseAddress}/v1/auth/register`;

  private loggedIn = false;

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
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        this.loggedIn = true;
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

  userLogout() {
    this.loggedIn = false;
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    // checa se existe token válido
    return !!localStorage.getItem('access_token');
  }
}
