import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { ErrorInputComponent } from '../../../../../shared/components/error-input/error-input.component';
import { AuthResponse, LoginRequest } from '../../../../../shared/models/auth.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, ErrorInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
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

  onSubmit() {
    this.log.info('Chamando API para logar o uruario');

    const request: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.log.info('Fazendo requisição do serviço: {}', request);
    this.authService.userLogin(request).subscribe({
      next: (response: AuthResponse) => {
        this.log.info('Resposta Recebida');
        this.onClose();
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.log.info('Erro ao tentar logar o usuário', error);
        this.cdr.detectChanges();
      },
    });
  }

  onClose(): void {
    this.authService.closeLoginModal();
  }
}
