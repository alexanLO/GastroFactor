import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { MyCollection } from './pages/my-collection/my-collection';

export const routes: Routes = [
  { path: '', redirectTo: 'gastrofactor', pathMatch: 'full' },
  { path: 'gastrofactor', component: MainScreen },
  { path: 'meu-acervo', component: MyCollection },
  { path: 'sobre', component: MainScreen }, // TODO depois criar a pagina sobre
];
