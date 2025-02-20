import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';

@Component({
  selector: 'form-token',
  imports: [CustomInputComponent],
  template: `<Form>
    <!-- <custom-input
      class="w-full"
      label="Tipo"
      type="text"
      [control]="form.controls.email"
    /> -->
  </Form>`,
})
export class FormTokenComponet {}
