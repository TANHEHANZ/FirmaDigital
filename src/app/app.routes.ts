import { Routes } from '@angular/router';
import { ValidateComponent } from './presentation/pages/validate/upload.component';
import { VerifyComponent } from './presentation/pages/verify/verify.component';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { PrivateComponent } from './presentation/layouts/private/private.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: PrivateComponent,
    children: [
      {
        path: 'firmar',
        component: ValidateComponent,
      },
      {
        path: 'verify',
        component: VerifyComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];
