import { Component, inject, input, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-link',
  imports: [RouterLink, RouterModule, NgClass],
  template: `
    <a
      class="px-4 py-2 flex gap-2 items-center border- hover:text-primary  hover:border-gray-300    rounded-xl hover:backdrop-blur-md   "
      [ngClass]="{
        ' justify-center': !expand.isCollapsed(),
        'justify-start ': expand.isCollapsed()
      }"
      [routerLink]="route()"
      routerLinkActive="text-primary border border-gray-300"
      [routerLinkActiveOptions]="{ exact: true }"
      [attr.aria-current]="isActive() ? 'page' : null"
    >
      <i [class]="'fa ' + iconName()" class="text-xl"></i>
      @if(expand.isCollapsed()){
      <p>{{ label() }}</p>
      }
    </a>
  `,
  standalone: true,
})
export class LinkComponent {
  route = input<string>();
  isActive = input<boolean>(false);
  label = input<string>();
  iconName = input<string>();
  expand = inject(SidebarService);
}
