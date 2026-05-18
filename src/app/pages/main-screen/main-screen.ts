import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculationService } from '../../core/services/calculation.service';
import { CalculationRequest, CalculationResponse } from '../../shared/models/calculation.model';
import { CalcularDialog } from '../../component/calcular-dialog/calcular-dialog';
import { RouterLink } from '@angular/router';
import { Footer } from '../../component/footer/footer';
import { NGXLogger } from 'ngx-logger';
import { RegisterPageComponent } from '../../features/auth/pages/register/register-page.component';

@Component({
  standalone: true,
  selector: 'app-main-screen',
  imports: [FormsModule, CalcularDialog, Footer, RouterLink, RegisterPageComponent],
  templateUrl: './main-screen.html',
  styleUrls: ['./main-screen.scss'],
})
export class MainScreen {
  foodName: string = '';
  foodWeight: number = 0;
  typeWeight: string = 'bruto';
  calculationResult: CalculationResponse | null = null;
  showResultModal: boolean = false;

  constructor(
    private calculationService: CalculationService,
    private cdr: ChangeDetectorRef,
    private log: NGXLogger,
  ) {}

  onCalculate() {
    this.log.info(
      'Calculando  com o nome do alimento = {}, peso do alimento = {}, tipo de peso = {}',
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

    this.log.info('Chamando requisição do serviço:', request);

    this.calculationService.calculateFactor(request).subscribe({
      next: (response) => {
        this.log.info('Resposta recebida:', response);
        this.calculationResult = response;
        this.showResultModal = true;
        document.body.classList.add('modal-open'); // trava o scroll
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.log.error('Erro no cálculo:', error);
        this.showResultModal = true;
        document.body.classList.remove('modal-open'); // garante liberar o scroll mesmo em caso de erro
        this.cdr.detectChanges();
      },
    });
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
    this.showResultModal = false;
    document.body.classList.remove('modal-open'); // libera o scroll
  }
}
