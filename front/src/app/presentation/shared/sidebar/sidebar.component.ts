import { ICONS } from './../ui/icons';
import { Component, inject } from '@angular/core';
import { LinkComponent } from '../ui/link.component';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { WrapperlinkComponent } from './components/wrapperlink';
import { AuthService } from '../../../application/services/login.service';
import { TokenStateService } from '../../../application/services/token-state.service';
import { Route, Router } from '@angular/router';
import { ButtonPrimaryComponent } from '../ui/button/primary.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    LinkComponent,
    NgClass,
    WrapperlinkComponent,
    ButtonPrimaryComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  PATH_ROUTES = PATH_ROUTES;
  ICONS = ICONS;
  readonly sidebarService = inject(SidebarService);
  constructor(
    private authService: AuthService,
    private tokenStateService: TokenStateService
  ) {}
  private router = inject(Router);
  handleLogout() {
    this.authService.logout();
    this.tokenStateService.clearState();
    this.router.navigate(['/login']);
  }
}
