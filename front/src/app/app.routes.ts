import { Routes } from '@angular/router';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { PrivateComponent } from './presentation/layouts/private/private.component';
import { FormRegisterComponent } from './presentation/pages/login/components/form-register.component';
import { FormLoginComponent } from './presentation/pages/login/components/form-login.component';
import { TokenComponent } from './presentation/pages/token/token.component';
import { ConfigurationComponent } from './presentation/pages/configuration/configuration.component';
import { SignedComponent } from './presentation/pages/document/signed/signed.component';
import { AuthGuard } from './application/guards/auth.guard';
import { ValidateComponent } from './presentation/pages/validate/validate.component';

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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'firmar',
        component: SignedComponent,
      },
      {
        path: 'document-signed',
        component: SignedComponent,
      },
      {
        path: 'validar-documentos',
        component: ValidateComponent,
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
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
