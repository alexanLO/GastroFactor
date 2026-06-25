import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public authService = inject(AuthService);

  showLoginModal: boolean = false;
  showRegisterModal: boolean = false;

  @Output() loginClicked = new EventEmitter<void>();
  @Output() registerClicked = new EventEmitter<void>();

  onRegister() {
    this.showRegisterModal = true;
    this.registerClicked.emit();
    document.body.classList.add('modal-open');
  }

  onLogin() {
    this.showLoginModal = true;
    this.loginClicked.emit();
    document.body.classList.add('modal-open');
  }

  onLogout() {
    this.authService.userLogout();
  }
}
