import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-input',
  imports: [],
  templateUrl: './error-input.component.html',
  styleUrl: './error-input.component.scss',
})
export class ErrorInputComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
}
