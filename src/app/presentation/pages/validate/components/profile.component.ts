import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  template: './profile.component.html',
})
export class ProfileComponent {
  slot = input<number>();
}
