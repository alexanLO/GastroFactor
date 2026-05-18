import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../env/environment';
import { CalculationRequest, CalculationResponse } from '../../shared/models/calculation.model';

/**
 * Serviço responsável pela comunicação com o backend Spring Boot
 * para cálculos culinários
 */
@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private readonly uriApiCalculator = `${environment.baseAddress}v1/calculadora`;

  constructor(
    private http: HttpClient,
    private log: NGXLogger,
  ) {}

  /**
   * Envia os dados do formulário de cálculo para o backend
   * @param request - Dados do formulário (foodName, foodWeight, typeWeight)
   * @returns Observable com os resultados do cálculo
   */
  calculateFactor(request: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(this.uriApiCalculator, request).pipe(
      tap((response) => {
        this.log.info('Cálculo realizado com sucesso:', response);
      }),
    );
  }
}
