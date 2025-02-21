import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { CustomSelectComponent } from '../../../shared/ui/select.component';

@Component({
  selector: 'token-filter',
  template: `
    <div class="flex gap-4 justify-end items-end">
      <custom-input type="search" label="Filtrar"></custom-input>
      <custom-select
        [options]="[
          { label: 'Juridica', value: 'Juridica' },
          { label: 'Natural', value: 'Natural' }
        ]"
      />
    </div>
  `,
  imports: [CustomInputComponent, CustomSelectComponent],
})
export class TokenFiltersComponet {}
