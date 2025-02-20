import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';

@Component({
  selector: 'user-filter',
  template: `
    <div class="flex gap-4">
      <custom-input type="search" label="Filtrar"></custom-input>
      <custom-select
        label="Filtrar por:"
        [options]="[
          { label: 'Juridica', value: 'Juridica' },
          { label: 'Natural', value: 'Natural' }
        ]"
      />
    </div>
  `,
  imports: [CustomInputComponent, CustomSelectComponent],
})
export class UserFilerComponet {}
