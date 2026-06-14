import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculationService } from '../../core/services/calculation.service';
import { CalculationRequest, CalculationResponse } from '../../shared/models/calculation.model';
import { CalcularDialog } from '../../component/calcular-dialog/calcular-dialog';
import { RegisterComponent } from '../../features/auth/pages/register/register.component';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from '../../features/auth/pages/login/login-page.component/login-page.component';
import { AuthService } from '../../features/auth/services/auth.service';
import { FooterComponent } from '../../component/footer/footer.component';


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
    FooterComponent
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
  showRegisterModal: boolean = false;
  showLoginModal: boolean = false;

  public authService = inject(AuthService);
  private calculationService = inject(CalculationService);
  private cdr = inject(ChangeDetectorRef);

  onCalculate() {
    console.log(
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

    console.log('Fazendo requisição do serviço: ', request);

    this.calculationService.calculateFactor(request).subscribe({
      next: (response) => {
        console.log('Resposta recebida:', response);
        this.calculationResult = response;
        this.showDialog = true;
        document.body.classList.add('modal-open'); // trava o scroll
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro no cálculo:', error);
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
    this.showRegisterModal = false;
    this.showLoginModal = false;
    document.body.classList.remove('modal-open'); // libera o scroll
  }
}
