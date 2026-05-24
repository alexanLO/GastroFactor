import { ChangeDetectorRef, Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  @Output() close = new EventEmitter<void>();
  private authService = inject(AuthService);
  private formBuilder = inject(NonNullableFormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private log = inject(NGXLogger);
  public loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {}

  onClose() {
    this.close.emit();
  }
}
