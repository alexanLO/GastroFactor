import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { catchError, Observable, throwError } from 'rxjs';
import { resolveApiErrorMessage } from '../utils/api-error-message.util';

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
        const errorMessage = resolveApiErrorMessage(error);

        this.log.error('Erro na API:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }
}
