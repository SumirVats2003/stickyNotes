import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllusersComponent } from './register/allusers/allusers.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'login', component: LoginComponent, outlet: 'side-nav' },
  {
    path: 'register',
    component: RegisterComponent,
    children: [{ path: 'allusers', component: AllusersComponent }],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
