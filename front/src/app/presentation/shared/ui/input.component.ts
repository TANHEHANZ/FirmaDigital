import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'custom-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  template: `
    <div class="flex flex-col gap-1 my-2 items-start w-full flex-1  ">
      <label [for]="id" class="block">
        {{ label }}
        <span *ngIf="isRequired()" class="text-red-500">*</span>
      </label>
      <input
        [id]="id"
        [type]="type"
        class="border flex-1 rounded-md p-1 px-2 w-full outline-none"
        [ngClass]="getValidationClass()"
        [formControl]="control"
        (blur)="onTouched()"
      />
      <p
        *ngIf="control.invalid && control.touched"
        class="text-red-500 text-sm"
      >
        {{ getErrorMessage() }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl();

  id = Math.random().toString(36).substr(2, 9);

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  getValidationClass(): Record<string, boolean> {
    return {
      'ring-1 ring-red-500': this.control.invalid && this.control.touched,
      'ring-1 ring-green-500': this.control.valid && this.control.touched,
    };
  }

  getErrorMessage(): string {
    if (this.control.hasError('required')) return 'Este campo es obligatorio.';
    if (this.control.hasError('email')) return 'Ingrese un email válido.';
    if (this.control.hasError('minlength'))
      return `Mínimo ${
        this.control.getError('minlength').requiredLength
      } caracteres.`;
    if (this.control.hasError('maxlength'))
      return `Máximo ${
        this.control.getError('maxlength').requiredLength
      } caracteres.`;
    if (this.control.hasError('pattern')) {
      if (this.control.errors?.['pattern'].requiredPattern.includes('[A-Z]'))
        return 'Debe contener al menos una letra mayúscula.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[a-z]'))
        return 'Debe contener al menos una letra minúscula.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[0-9]'))
        return 'Debe contener al menos un número.';
      if (this.control.errors?.['pattern'].requiredPattern.includes('[\\W_]'))
        return 'Debe contener al menos un carácter especial.';
    }
    return '';
  }
}
