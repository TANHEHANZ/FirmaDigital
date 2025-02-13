import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { ButtonSecundaryComponent } from '../../shared/ui/button/secundary.component';

@Component({
  selector: 'app-login',
  imports: [ButtonPrimaryComponent, ButtonSecundaryComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ICONS = ICONS;
  router = inject(Router);
  logout() {
    this.router.navigate([PATH_ROUTES.DASHBOARD_FIRMAR]);
  }
}
