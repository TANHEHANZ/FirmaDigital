import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterLink],
  template: `
    <a
      class="bg-white w-full "
      [routerLink]="route()"
      routerLinkActive="active"
      [attr.aria-current]="isActive() ? 'page' : null"
    >
      <i class="mr-2" [class]="'fa ' + iconName()"></i>
      {{ label() }}</a
    >
  `,
  standalone: true,
})
export class LinkComponent {
  route = input<string>();
  isActive = input<boolean>(false);
  label = input<string>();
  iconName = input<string>();
}
