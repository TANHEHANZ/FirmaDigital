import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ICONS } from '../../shared/ui/icons';
@Component({
  selector: 'app-upload',
  imports: [ButtonComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class ValidateComponent {
  ICONS = ICONS;
  Validate() {}
}
