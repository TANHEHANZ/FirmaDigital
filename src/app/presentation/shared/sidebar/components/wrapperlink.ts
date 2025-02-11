import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-wrapperlink',
  imports: [],
  template: ` <section class="w-full flex flex-col items-start gap-2">
    <p class="text-xs font-medium text-gray-400 uppercase">{{ title() }}</p>
    <ng-content></ng-content>
  </section>`,
})
export class WrapperlinkComponent {
  title = input<string>();
}
