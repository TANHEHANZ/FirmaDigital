import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button-primary',
  imports: [NgIf],

  template: `
    <button
      (click)="onClick()"
      class="bg-uploaded text-white  rounded-md flex gap-2 justify-around items-center h-12 overflow-hidden  hover:bg-uploaded/80 duration-300 transition-all cursor-pointer z-2 shadow-md border border-gray-300"
    >
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full bg-white text-black px-4 z-1 cursor-pointer"
      >
        <i [class]="icon()"></i>
      </label>
      <label class="  font-medium z-1 flex-1 px-8 cursor-pointer">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonPrimaryComponent {
  label = input<string>();
  icon = input<string>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
