import { Component, EventEmitter, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button (click)="onClick()">
      <i [class]="icon()"></i>
      {{ label() }}
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
