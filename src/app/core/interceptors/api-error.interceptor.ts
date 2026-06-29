import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorInterceptor {
  private readonly log = inject(NGXLogger);
 /**
   * Trata erros da API de forma centralizada
   * @param error - Erro retornado pela API
   * @returns Observable com erro tratado
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao processar requisição';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status === 0) {
          errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
        } else if (error.error && typeof error.error === 'object') {
          errorMessage = error.error.message || `Erro ${error.status}`;
        } else {
          errorMessage = `Erro ${error.status}: ${error.statusText}`;
        }

        this.log.error('Erro na API:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
