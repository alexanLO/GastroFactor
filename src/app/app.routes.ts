import { Routes } from '@angular/router';
import { MainScreen } from './pages/main-screen/main-screen';

export const routes: Routes = [
  { path: '', redirectTo: 'grastrofactor', pathMatch: 'full' },
  { path: 'grastrofactor', component: MainScreen },
];
