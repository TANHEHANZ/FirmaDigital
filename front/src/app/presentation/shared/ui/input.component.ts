import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'basic-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-1 w-full my-2 items-start">
      <label for="" class="block">
        {{ label() }}
        <span *ngIf="isRequired()" class="text-red-500">*</span>
      </label>
      <input
        [type]="type()"
        [placeholder]="placeholder()"
        [formControl]="inputControl"
        (input)="onInput($event)"
        class="border flex-1 rounded-md p-1 px-2 w-full outline-none border-gray-300"
      />
    </div>
  `,
})
export class BasicInputComponent {
  label = input<string>('');
  type = input<string>('');
  placeholder = input<string>('');
  isRequired = input<boolean>(false);
  valueChange = output<string>();

  inputControl = new FormControl(
    '',
    this.isRequired() ? [Validators.required] : []
  );

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
