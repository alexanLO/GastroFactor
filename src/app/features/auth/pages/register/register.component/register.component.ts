import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() navigateToLogin = new EventEmitter<void>();

  registerForm: FormGroup;

  constructor(
    //  private authService: AuthService,
    private cdr: ChangeDetectorRef,
   // private log: NGXLogger,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cargo: ['', Validators.required],
        senha: ['', [Validators.required, Validators.minLength(8)]],
        confirmar: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirmar = control.get('confirmar')?.value;

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

  onSubmit() {
    // if (this.registerForm.valid) {
    //   console.log('Registrando:', this.registerForm.value);
    // Lógica de API aqui
  }
}
