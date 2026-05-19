import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private readonly uriApiLogin = `${environment.baseAddress}/v1/auth/login`;
    private readonly uriApiRegister = `${environment.baseAddress}/v1/auth/register`;

      /**
   * Envia os dados do formulário de registro de usuário para o backend
   * @param req - Dados do formulário (foodName, foodWeight, typeWeight)
   * @returns Observable com token de acesso e o refresh token
   */
  userRegisterApi(){}
}
