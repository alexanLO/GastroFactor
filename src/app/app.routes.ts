import { Routes } from '@angular/router';

import { MainScreen } from './pages/main-screen/main-screen';
import { LoginPageComponent } from './features/auth/pages/login/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register/register-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'grastrofactor', pathMatch: 'full' },
  { path: 'grastrofactor', component: MainScreen },
  { path: 'login', component: LoginPageComponent },
  {path: 'cadastrar', component: RegisterPageComponent}
];
