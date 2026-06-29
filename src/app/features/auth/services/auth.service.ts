import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { catchError, finalize, Observable, of, throwError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../../shared/models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly uriApiLogin = `${environment.baseAddress}/v1/auth/login`;
  private readonly uriApiRegister = `${environment.baseAddress}/v1/auth/register`;
  private readonly uriApiLogout = `${environment.baseAddress}/v1/auth/logout`;
  private readonly uriApiRefresh = `${environment.baseAddress}/v1/auth/refresh`;
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private accessTokenCache: string | null = null;
  private refreshTokenCache: string | null = null;

  private loggedIn = false;

  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);
  private log: NGXLogger = inject(NGXLogger);

  showLoginModal = signal(false);

  userLogin(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.uriApiLogin, request).pipe(
      tap((response) => {
        this.log.info('Login realizado com sucesso.');
        this.persistTokens(response);
        this.loggedIn = true;
        this.router.navigate(['/meu-acervo']);
      }),
    );
  }

  userRegister(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.uriApiRegister, request).pipe(
      tap((response) => {
        this.log.info('Usuário cadastrado com sucesso.');
        this.persistTokens(response);
        this.loggedIn = true;
        this.router.navigate(['/meu-acervo']);
      }),
    );
  }

  userLogout(): void {
    const accessToken = this.getStoredItem(this.accessTokenKey);
    const refreshToken = this.getStoredItem(this.refreshTokenKey);

    if (!accessToken || !refreshToken) {
      this.finalizeLogout();
      return;
    }

    this.http
      .post<void>(
        this.uriApiLogout,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .pipe(
        catchError((error) => {
          this.log.warn('Falha ao invalidar sessão no backend durante logout.', error);
          return of(void 0);
        }),
        finalize(() => this.finalizeLogout()),
      )
      .subscribe();
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token não encontrado.'));
    }

    return this.http.post<AuthResponse>(`${this.uriApiRefresh}/${encodeURIComponent(refreshToken)}`, {}).pipe(
      tap((response) => {
        this.persistTokens(response);
      }),
    );
  }

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return false;
    }

    if (this.isJwtExpired(accessToken)) {
      this.clearTokens();
      return false;
    }

    return true;
  }

  openLoginModal() {
    this.showLoginModal.set(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open');
    }
  }

  closeLoginModal() {
    this.showLoginModal.set(false);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  private persistTokens(response: AuthResponse): void {
    this.accessTokenCache = response.accessToken;
    this.setStoredItem(this.accessTokenKey, response.accessToken);

    if (response.refreshToken) {
      this.refreshTokenCache = response.refreshToken;
      this.setStoredItem(this.refreshTokenKey, response.refreshToken);
      return;
    }

    this.refreshTokenCache = null;
    this.removeStoredItem(this.refreshTokenKey);
  }

  private clearTokens(): void {
    this.accessTokenCache = null;
    this.refreshTokenCache = null;
    this.removeStoredItem(this.accessTokenKey);
    this.removeStoredItem(this.refreshTokenKey);
  }

  private setStoredItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      this.log.warn('Falha ao persistir token no storage.', error);
    }
  }

  private getStoredItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
      }
    } catch (error) {
      this.log.warn('Falha ao ler token do storage.', error);
    }

    return null;
  }

  getAccessToken(): string | null {
    if (this.accessTokenCache) {
      return this.accessTokenCache;
    }

    const token = this.getStoredItem(this.accessTokenKey);

    if (token) {
      this.accessTokenCache = token;
    }

    return token;
  }

  getRefreshToken(): string | null {
    if (this.refreshTokenCache) {
      return this.refreshTokenCache;
    }

    const token = this.getStoredItem(this.refreshTokenKey);

    if (token) {
      this.refreshTokenCache = token;
    }

    return token;
  }

  private removeStoredItem(key: string): void {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      this.log.warn('Falha ao remover token do storage.', error);
    }
  }

  private isJwtExpired(token: string): boolean {
    const payload = this.decodeJwtPayload(token);
    if (!payload || typeof payload.exp !== 'number') {
      return true;
    }

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
  }

  private decodeJwtPayload(token: string): { exp?: number } | null {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3 || typeof window === 'undefined') {
      return null;
    }

    try {
      const payload = this.normalizeBase64Url(tokenParts[1]);
      const decoded = window.atob(payload);
      return JSON.parse(decoded) as { exp?: number };
    } catch {
      return null;
    }
  }

  private normalizeBase64Url(value: string): string {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = normalized.length % 4;

    if (padding === 0) {
      return normalized;
    }

    return normalized + '='.repeat(4 - padding);
  }

  private finalizeLogout(): void {
    this.loggedIn = false;
    this.clearTokens();
    this.router.navigate(['/gastrofactor']);
  }
}
