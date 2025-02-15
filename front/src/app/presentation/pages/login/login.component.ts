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
import {
  LoginService,
  res_data,
} from '../../../application/services/login.service';
import { res } from '../../../application/models/api.response';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-login',
  imports: [
    ButtonPrimaryComponent,
    ButtonSecundaryComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    Toast,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  ICONS = ICONS;
  readonly router = inject(Router);
  readonly loginService = inject(LoginService);
  readonly messageService = inject(MessageService);
  logout() {
    this.sendData();
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

  sendData() {
    this.loginService.login(this.form().value).subscribe({
      next: (response: res<res_data>) => {
        console.log(response);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
          life: 3000,
        });
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error', // 'error' en lugar de 'danger' (PrimeNG usa 'error')
          summary: 'Error',
          detail: error.error?.message || 'Ocurrió un error inesperado',
          life: 3000,
        });
      },
    });
  }
}
