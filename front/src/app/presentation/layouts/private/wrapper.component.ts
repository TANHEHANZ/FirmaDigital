import { Component, input } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  template: `
    <main
      class="h-screen bg-white p-8 grid grid-rows-[auto,1fr] grid-cols-3 gap-4"
    >
      <h1 class="text-3xl font-bold col-span-3">{{ title() }}</h1>
      <ng-content></ng-content>
    </main>
  `,
})
export class WrapperComponent {
  title = input<string>();
}
