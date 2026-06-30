import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcularDialog } from '../../../calculator/components/calcular-dialog/calcular-dialog';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { CalculationService } from '../../../../core/services/calculation.service';
import { LoginPageComponent } from '../../../../features/auth/pages/login/login-page.component/login-page.component';
import { RegisterComponent } from '../../../../features/auth/pages/register/register.component';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { resolveUnknownErrorMessage } from '../../../../core/utils/api-error-message.util';
import { CalculationRequest, CalculationResponse } from '../../../../shared/models/calculation.model';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { NGXLogger } from 'ngx-logger';

@Component({
  standalone: true,
  selector: 'app-main-screen',
  imports: [
    FormsModule,
    CalcularDialog,
    CommonModule,
    ReactiveFormsModule,
    RegisterComponent,
    LoginPageComponent,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './main-screen.html',
  styleUrls: ['./main-screen.scss'],
})
export class MainScreen {
  foodName: string = '';
  foodWeight: number = 0;
  typeWeight: string = 'bruto';
  calculationResult: CalculationResponse | null = null;
  
  showDialog: boolean = false;
  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  public authService = inject(AuthService);
  private calculationService = inject(CalculationService);
  private log = inject(NGXLogger);
  private cdr = inject(ChangeDetectorRef);

  onCalculate() {
    this.log.debug(
      'Chamando API para calcular com o nome do alimento = {}, peso do alimento = {}, tipo de peso = {}',
      this.foodName,
      this.foodWeight,
      this.typeWeight,
    );

    this.calculationResult = null;

    const request: CalculationRequest = {
      foodName: this.foodName,
      foodWeight: this.foodWeight,
      typeWeight: this.mapTypeWeight(this.typeWeight),
    };

    this.log.debug('Fazendo requisição do serviço: ', request);

    this.calculationService.calculateFactor(request).subscribe({
      next: (response) => {
        this.log.debug('Resposta recebida:', response);
        this.calculationResult = response;
        this.showDialog = true;
        document.body.classList.add('modal-open'); // trava o scroll
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.log.error(resolveUnknownErrorMessage(error, 'Erro ao calcular fator de correcao.'), error);
        this.showDialog = true;
        document.body.classList.remove('modal-open'); // garante liberar o scroll mesmo em caso de erro
        this.cdr.detectChanges();
      },
    });
  }

  onRegister() {
    this.showRegisterModal = true;
    document.body.classList.add('modal-open');
  }

  onLogin() {
    this.showLoginModal = true;
    document.body.classList.add('modal-open');
  }

  onLogout(){
    this.authService.userLogout();
  }

  private mapTypeWeight(type: string): 'GROSS' | 'NET' | 'COOKED' {
    switch (type) {
      case 'bruto':
        return 'GROSS';
      case 'liquido':
        return 'NET';
      case 'cozido':
        return 'COOKED';
      default:
        return 'GROSS';
    }
  }

  closeModal() {
    this.showDialog = false;
    this.showLoginModal = false;
    this.showRegisterModal = false;
    document.body.classList.remove('modal-open');
  }
}
