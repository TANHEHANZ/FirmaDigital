import { Routes } from '@angular/router';
import { ValidateComponent } from './presentation/pages/validate/upload.component';
import { VerifyComponent } from './presentation/pages/verify/verify.component';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { PrivateComponent } from './presentation/layouts/private/private.component';
import { FormRegisterComponent } from './presentation/pages/login/components/form-register.component';
import { FormLoginComponent } from './presentation/pages/login/components/form-login.component';
import { TokenComponent } from './presentation/pages/token/token.component';
import { ConfigurationComponent } from './presentation/pages/configuration/configuration.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: '', component: FormLoginComponent },
      { path: 'register', component: FormRegisterComponent },
    ],
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
        path: 'token',
        component: TokenComponent,
      },
      {
        path: 'users',
        component: ProfileComponent,
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
      },
    ],
  },
];
