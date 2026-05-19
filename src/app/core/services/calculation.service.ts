import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../env/environment';
import { ApiErrorResponse, CalculationRequest, CalculationResponse } from '../../shared/models/calculation.model';

/**
 * Serviço responsável pela comunicação com o backend Spring Boot
 * para cálculos culinários
 */
@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  // URL base da API vem do arquivo de environment
  // Desenvolvimento: http://localhost:8080/api
  // Produção: https://api.gastrofactor.com/api
  private readonly calcFactorUri = `${environment.baseAddress}v1/calculadora`;

  constructor(private http: HttpClient) {}

  /**
   * Envia os dados do formulário de cálculo para o backend
   * @param data - Dados do formulário (foodName, foodWeight, typeWeight)
   * @returns Observable com os resultados do cálculo
   */
  calculateFactor(data: CalculationRequest): Observable<CalculationResponse> {
    return this.http
      .post<CalculationResponse>(this.calcFactorUri, data)
      .pipe(
        tap((response) => {
          console.log('Cálculo realizado com sucesso:', response);
        }),
        catchError((error) => this.handleError(error))
      );
  }


  /**
   * Trata erros da API de forma centralizada
   * @param error - Erro retornado pela API
   * @returns Observable com erro tratado
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Erro ao processar cálculo';

    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status === 0) {
      // Erro de conexão
      errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
    } else if (error.error && typeof error.error === 'object') {
      // Erro do servidor com resposta estruturada
      const apiError: ApiErrorResponse = error.error;
      errorMessage = apiError.message || `Erro ${error.status}`;
    } else {
      // Erro genérico
      errorMessage = `Erro ${error.status}: ${error.statusText}`;
    }

    console.error('Erro na API:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
