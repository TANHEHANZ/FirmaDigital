import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'button-secundary',
  imports: [NgIf],

  template: `
    <button
      (click)="onClick()"
      class=" text-primary  rounded-md flex gap-2 justify-center items-center h-12 overflow-hidden border  border-uploaded hover:bg-uploaded/20 duration-300 transition-all cursor-pointer z-50"
    >
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full bg-white text-black px-4 "
      >
        <i [class]="icon()"></i>
      </label>
      <label class=" px-8 font-medium">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonSecundaryComponent {
  label = input<string>();
  icon = input<string>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
