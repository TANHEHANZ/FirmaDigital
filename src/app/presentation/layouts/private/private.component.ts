import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet],
  template: `<main>
    <router-outlet />
  </main> `,
})
export class PrivateComponent {}
