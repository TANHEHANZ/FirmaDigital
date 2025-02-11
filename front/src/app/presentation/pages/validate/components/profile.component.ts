import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  template: ` <p>{{ slot() }}</p> `,
})
export class ProfileComponent {
  slot = input<number>();
}
