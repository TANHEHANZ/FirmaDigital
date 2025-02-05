import { Routes } from '@angular/router';
import { ValidateComponent } from './presentation/pages/validate/upload.component';
import { VerifyComponent } from './presentation/pages/verify/verify.component';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { LoginComponent } from './presentation/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'dashboard/validate',
    component: ValidateComponent,
  },
  {
    path: 'dashboard/verify',
    component: VerifyComponent,
  },
  {
    path: 'dashboard/profile',
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', redirectTo: 'dashboard/validate' },
];
