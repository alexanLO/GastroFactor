import { Routes } from '@angular/router';

import { MainScreen } from './pages/main-screen/main-screen';
import { LoginScreen } from './features/auth/pages/login-screen/login-screen';

export const routes: Routes = [
  { path: '', redirectTo: 'grastrofactor', pathMatch: 'full' },
  { path: 'grastrofactor', component: MainScreen },
  { path: 'login', component: LoginScreen },
  {path: 'cadastrar', component: MainScreen} //TODO modificar para a tela de cadastrar
];
