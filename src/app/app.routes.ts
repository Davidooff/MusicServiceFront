import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { MainWrapperComponent } from './pages/main-wrapper/main-wrapper.component';

export const routes: Routes = [
  { path: '', component: MainWrapperComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyCodeComponent },
];
