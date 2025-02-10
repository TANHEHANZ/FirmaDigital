import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
@Component({
  selector: 'app-upload',
  imports: [ButtonPrimaryComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class ValidateComponent {
  ICONS = ICONS;
  Validate() {}
}
