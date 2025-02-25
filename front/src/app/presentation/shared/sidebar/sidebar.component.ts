import { ICONS } from './../ui/icons';
import { Component, inject } from '@angular/core';
import { LinkComponent } from '../ui/link.component';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { WrapperlinkComponent } from './components/wrapperlink';
import { AuthService } from '../../../application/services/login.service';
import { TokenStateService } from '../../../application/services/token-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent, NgClass, WrapperlinkComponent],
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
  handleLogout() {
    this.authService.logout();
    this.tokenStateService.clearState();
  }
}
