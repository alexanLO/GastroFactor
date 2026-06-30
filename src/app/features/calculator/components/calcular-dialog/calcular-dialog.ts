import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalculationResponse } from '../../../../shared/models/calculation.model';

@Component({
  standalone: true,
  selector: 'app-calcular-dialog',
  templateUrl: './calcular-dialog.html',
  styleUrls: ['./calcular-dialog.scss'],
})
export class CalcularDialog {
  @Input() result: CalculationResponse | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
