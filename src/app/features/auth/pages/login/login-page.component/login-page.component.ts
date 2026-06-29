import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { ErrorInputComponent } from '../../../../../shared/components/error-input/error-input.component';
import { LoginRequest } from '../../../../../shared/models/auth.model';
import { NotificationService } from '../../../../../core/services/notification.service';
import { resolveUnknownErrorMessage } from '../../../../../core/utils/api-error-message.util';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs';

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
  private notificationService = inject(NotificationService);

  public loginForm: FormGroup;
  public isSubmitting = false;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.isSubmitting) {
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.log.info('Chamando API para logar o uruario');

    const request: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.log.info('Fazendo requisição do serviço: {}', request);
    this.authService
      .userLogin(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.log.info('Resposta Recebida');
          this.notificationService.showSuccess('Login realizado com sucesso.');
          this.onClose();
        },
        error: (error: HttpErrorResponse) => {
          const message = resolveUnknownErrorMessage(error, 'Erro ao tentar logar. Tente novamente.');
          this.notificationService.showError(message);
          this.log.info('Erro ao tentar logar o usuário', error);
        },
      });
  }

  onClose(): void {
    this.authService.closeLoginModal();
  }
}
