import { Toast } from 'primeng/toast';
import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../../application/services/login.service';
import { CustomSelectComponent } from '../../../shared/ui/select.component';
import { PATH_ROUTES } from '../../../../application/models/route.enum';
import {
  ACCESS_TOKEN,
  REFRESH__TOKEN,
} from '../../../../application/constants/CONSTANTS';

@Component({
  selector: 'form-register',
  template: `
    <p-toast position="bottom-right"></p-toast>

    <section
      class=" flex flex-col  justify-center items-center gap-2 w-[50dvw] h-full "
    >
      <h1 class="font-bold text-4xl  my-4 ">Formulario de registro</h1>
      <form
        [formGroup]="form"
        class="w-[70%] grid grid-cols-2 justify-center items-end  gap-2"
      >
        <custom-input
          class="w-full"
          label="Nombre"
          type="text"
          [control]="form.controls.name"
        />
        <custom-select
          class="w-full"
          label="Seleccione una opción"
          [control]="form.controls.tipo_user"
          [options]="[
            { label: 'Juridica', value: 'Juridica' },
            { label: 'Natural', value: 'Natural' }
          ]"
        />

        <custom-input
          class="w-full"
          label="Ci"
          type="text"
          [control]="form.controls.ci"
        />
        <custom-select
          class="w-full"
          label="Seleccione la Unidad al que pertenece"
          [control]="form.controls.idUnidad"
          [options]="[
            { label: 'unidad 1', value: '1' },
            { label: 'unidad 1', value: '2' }
          ]"
        />

        <custom-input
          class="w-full"
          label="Email"
          type="text"
          [control]="form.controls.email"
        /><custom-input
          class="w-full"
          label="Contraseña"
          type="password"
          [control]="form.controls.password"
        />
      </form>
      <div class="flex gap-2">
        <button-secundary label="Volver al login" (clicked)="visibleform()" />
        <button-primary label="Registrarse" (clicked)="register()" />
      </div>
    </section>
  `,
  imports: [
    ButtonPrimaryComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    ButtonSecundaryComponent,
    Toast,
    CustomSelectComponent,
  ],
})
export class FormRegisterComponent {
  private loginService = inject(AuthService);
  readonly messageService = inject(MessageService);
  private router = inject(Router);
  visibleform() {
    this.router.navigate(['/login']);
  }
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150),
    ]),
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
      Validators.pattern(/[A-Z]/),
      Validators.pattern(/[a-z]/),
      Validators.pattern(/[0-9]/),
      Validators.pattern(/[\W_]/),
    ]),
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern(/^\d+$/),
    ]),
    tipo_user: new FormControl('', [Validators.required]),
    idUnidad: new FormControl('', [Validators.required]),
  });

  register() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrige los errores en el formulario.',
        life: 3000,
      });
      return;
    }
    this.loginService
      .register({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        ci: this.form.value.ci ?? '',
        name: this.form.value.name ?? '',
        idRol: '1',
        idUnidad: this.form.value.idUnidad ?? '',
        tipo_user: 'Natural',
      })
      .subscribe({
        next: (response) => {
          if (response.status === 200 && response.data) {
            localStorage.setItem(ACCESS_TOKEN, response.data[0].accessToken);
            localStorage.setItem(REFRESH__TOKEN, response.data[0].refreshToken);

            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: response.message,
              life: 3000,
            });
            this.router.navigate([PATH_ROUTES.LOGOUT]);
          }
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Ocurrió un error inesperado',
            life: 3000,
          });
        },
      });
  }
}
