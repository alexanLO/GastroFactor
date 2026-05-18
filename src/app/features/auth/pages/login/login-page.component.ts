import { Component } from '@angular/core';
import { Footer } from '../../../../component/footer/footer';
import { NavbarAlternative } from '../../../../component/navbar-alternative/navbar-alternative';

@Component({
  selector: 'app-login-page.component',
  imports: [NavbarAlternative, Footer],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
 hide = true;
}
