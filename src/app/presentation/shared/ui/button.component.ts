import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],

  template: `
    <button
      (click)="onClick()"
      class="bg-uploaded text-white  rounded-md flex gap-2 justify-center items-center h-12 overflow-hidden border hover:bg-uploaded/80 duration-300 transition-all cursor-pointer"
    >
      <label
        class=" flex  justify-center items-center h-full bg-white text-black px-4 "
      >
        <i [class]="icon()"></i>
      </label>
      <label class=" px-8">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonComponent {
  label = input<string>();
  icon = input<string>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
