import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { MyCollection } from './pages/my-collection/my-collection';
import { authGuard } from './features/auth/guard/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'gastrofactor', pathMatch: 'full' },
  { path: 'gastrofactor', component: MainScreen },
  { path: 'meu-acervo', component: MyCollection, canActivate: [authGuard] },
  { path: 'sobre', component: MainScreen }, // TODO depois criar a pagina sobre
];
