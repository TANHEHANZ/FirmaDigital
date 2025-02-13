import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'Basic-input',
  imports: [NgIf],

  template: `
    <div class="flex flex-col gap-1 w-full my-2 items-start">
      <label for="" class="block"> {{ label() }} </label>
      <input type="text" class="border flex-1 rounded-md p-1 px-2 w-full" />
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full bg-white text-black px-4 "
      >
        <i [class]="icon()"></i>
      </label>
    </div>
  `,
})
export class BasicInputComponent {
  label = input<string>();
  icon = input<string>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
