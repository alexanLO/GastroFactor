import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';
import { MyCollection } from './pages/my-collection/my-collection';
import { TechnicalSpecification } from './pages/technical-specification/technical-specification';

export const routes: Routes = [
  { path: '', redirectTo: 'gastrofactor', pathMatch: 'full' },
  { path: 'gastrofactor', component: MainScreen },
  { path: 'meu-acervo', component: MyCollection },
  { path: 'sobre', component: TechnicalSpecification }, // TODO depois criar a pagina sobre
];
