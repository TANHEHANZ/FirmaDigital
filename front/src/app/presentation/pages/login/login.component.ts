import { Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { PATH_ROUTES } from '../../../application/models/route.enum';
import { ButtonSecundaryComponent } from '../../shared/ui/button/secundary.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ButtonPrimaryComponent,
    ButtonSecundaryComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ICONS = ICONS;
  router = inject(Router);
  logout() {

    
    this.router.navigate([PATH_ROUTES.DASHBOARD_FIRMAR]);
  }

  form = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(150),
      ]),
    })
  );
  validar() {
    console.log(this.form().value);
  }
  isFieldRequired(fieldName: string): boolean {
    const control = this.form().get(fieldName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return validator && validator['required'];
    }
    return false;
  }
}
