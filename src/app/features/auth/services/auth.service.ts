import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../../shared/models/auth.model';
import { Router } from '@angular/router'; // ✅ import correto

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly uriApiLogin = `${environment.baseAddress}/v1/auth/login`;
  private readonly uriApiRegister = `${environment.baseAddress}/v1/auth/register`;

  private loggedIn = false;

  private router: Router = inject(Router);

  constructor(
    private http: HttpClient,
    private log: NGXLogger,
  ) {}

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

  userRegister(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.uriApiRegister, request).pipe(
      tap((response) => {
        this.log.info('Usuário cadastrado com sucesso.');
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        this.loggedIn = true;
        this.router.navigate(['/meu-acervo']); // ✅ agora funciona
      }),
    );
  }

  userLogout() {
    this.loggedIn = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(["/gastrofactor"])
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
