import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button.component';
import { ICONS } from '../../shared/ui/icons';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ICONS = ICONS;
}
