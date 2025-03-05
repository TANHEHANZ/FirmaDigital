import { Routes } from '@angular/router';
import { ProfileComponent } from './presentation/pages/profile/profile.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { PrivateComponent } from './presentation/layouts/private/private.component';
import { FormRegisterComponent } from './presentation/pages/users/components/form-register.component';
import { FormLoginComponent } from './presentation/pages/login/components/form-login.component';
import { TokenComponent } from './presentation/pages/token/token.component';
import { ConfigurationComponent } from './presentation/pages/configuration/configuration.component';
import { AuthGuard } from './application/guards/auth.guard';
import { ValidateComponent } from './presentation/pages/validate/validate.component';
import { SignedComponent } from './presentation/pages/signed/signed.component';
import { SignedFileComponent } from './presentation/pages/document/signedFile/signed.component';
import { UsersComponent } from './presentation/pages/users/users.component';
import { RoleGuard } from './application/guards/role.guard';

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
        canActivate: [RoleGuard],
        data: { userRole: 'USUARIO' },
      },
      {
        path: 'document-signed',
        component: SignedFileComponent,
        canActivate: [RoleGuard],
        data: { userRole: 'USUARIO' },
      },
      {
        path: 'validar-documentos',
        component: ValidateComponent,
        canActivate: [RoleGuard],
        data: { userRole: 'USUARIO' },
      },
      {
        path: 'token',
        component: TokenComponent,
        canActivate: [RoleGuard],
        data: { userRole: 'ADMINISTRADOR' },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { userRole: 'ADMINISTRADOR' },
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
        canActivate: [RoleGuard],
        data: { userRole: 'ADMINISTRADOR' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
