import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Inject, Output } from '@angular/core';
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
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  public authResult: AuthResponse | null = null;
  public registerForm: FormGroup;

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
    console.log('chamando backend');
    const request: RegisterRequest = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      occupation: this.registerForm.get('occupation')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.log.info('Chamando requisição do serviço: {}', request);
    this.authService.userRegister(request).subscribe({
      next: (response: AuthResponse) => {
        this.log.info('Resposta recebida');
        this.authResult = response;
        this.onClose();
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.log.error('Erro ao tentar registrar o usuário:', error);
        this.cdr.detectChanges();
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
