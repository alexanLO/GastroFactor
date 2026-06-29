import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { AuthResponse, RegisterRequest } from '../../../../shared/models/auth.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { resolveUnknownErrorMessage } from '../../../../core/utils/api-error-message.util';
import { AuthService } from '../../services/auth.service';
import { ErrorInputComponent } from '../../../../shared/components/error-input/error-input.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ErrorInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() navigateToLogin = new EventEmitter<void>();

  private authService = inject(AuthService);
  private formBuilder = inject(NonNullableFormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private log = inject(NGXLogger);
  private notificationService = inject(NotificationService);

  public authResult: AuthResponse | null = null;
  public registerForm: FormGroup;
  public isSubmitting = false;

  constructor() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        occupation: [''],
        password: ['', [Validators.required]],
        confirmsPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  onSubmit() {
    if (this.isSubmitting) {
      return;
    }

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.log.info('Chamando API para cadastrar usuario');
    const request: RegisterRequest = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      occupation: this.registerForm.get('occupation')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.log.info('Fazendo requisição do serviço: {}', request);
    this.authService
      .userRegister(request)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (response: AuthResponse) => {
          this.log.info('Resposta recebida');
          this.authResult = response;
          this.notificationService.showSuccess('Cadastro realizado com sucesso.');
          this.onClose();
        },
        error: (error: HttpErrorResponse) => {
          const message = resolveUnknownErrorMessage(error, 'Erro ao registrar usuario. Tente novamente.');
          this.notificationService.showError(message);
          this.log.error('Erro ao tentar registrar o usuário:', error);
        },
      });
  }

  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const senha = control.get('password')?.value;
    const confirmar = control.get('confirmsPassword')?.value;

    if (senha && confirmar && senha !== confirmar) {
      return { mismatch: true };
    }
    return null;
  };

  onClose() {
    this.close.emit();
  }
  onLogin() {
    this.navigateToLogin.emit();
  }
}
