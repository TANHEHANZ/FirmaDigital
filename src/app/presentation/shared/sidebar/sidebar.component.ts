import { ICONS } from './../ui/icons';
import { Component, inject } from '@angular/core';
import { LinkComponent } from '../ui/link.component';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent, NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  PATH_ROUTES = PATH_ROUTES;
  ICONS = ICONS;
  readonly sidebarService = inject(SidebarService);
}
