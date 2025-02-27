import { NgIf } from '@angular/common';
import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'button-secundary',
  imports: [NgIf],

  template: `
    <button
      (click)="onClick()"
      [disabled]="disabled()"
      [class]="
        disabled() ? 'bg-gray-300 cursor-not-allowed opacity-25' : 'bg-white'
      "
      class=" text-primary  rounded-md flex gap-2 justify-center items-center h-12 overflow-hidden border  border-uploaded hover:bg-uploaded/20 duration-300 transition-all cursor-pointer z-50"
    >
      <label
        *ngIf="icon()"
        class=" flex  justify-center items-center h-full bg-primary text-white px-4 cursor-pointer "
      >
        <i [class]="icon()"></i>
      </label>
      <label class=" px-8 font-medium" *ngIf="label()">
        {{ label() }}
      </label>
    </button>
  `,
})
export class ButtonSecundaryComponent {
  label = input<string>();
  icon = input<string>();
  disabled = input<boolean>();
  clicked = output<void>();
  onClick() {
    this.clicked.emit();
  }
}
