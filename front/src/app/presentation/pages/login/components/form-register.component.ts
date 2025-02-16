import { Toast } from 'primeng/toast';
import { Component, EventEmitter, inject, output, Output } from '@angular/core';
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
import { AuthStateService } from '../../../../application/global/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../../application/services/login.service';

@Component({
  selector: 'form-register',
  template: `
    <p-toast position="bottom-right"></p-toast>

    <section
      class="flex flex-col justify-center items-center text-center gap-2 w-[50dvw] h-full"
    >
      <h1 class="font-bold text-4xl">Formulario de registro</h1>
      <form [formGroup]="form" class="w-1/2">
       <div class="flex gap-2">
       <custom-input
          class="w-full"
          label="Nombre"
          type="text"
          [control]="form.controls.name"
        />
      
        <custom-input
          class="w-full"
          label="Tipo Persona"
          type="text"
          [control]="form.controls.tipo_user"
        />
       </div>
       <div class="flex gap-2">
       <custom-input
          class="w-full"
          label="Ci"
          type="text"
          [control]="form.controls.ci"
        />
        <custom-input
          class="w-full"
          label="Unidad"
          type="text"
          [control]="form.controls.idUnidad"
        />
       </div>
     
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
  ],
})
export class FormRegisterComponent {
  private loginService = inject(LoginService);
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
      Validators.email,
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(10),
      Validators.pattern(/^\d+$/),
    ]),
    tipo_user: new FormControl('', [Validators.required]),
    idRol: new FormControl('', [Validators.required]),
    idUnidad: new FormControl('', [Validators.required]),
  });

  register() {
    if (this.form.invalid) {
this.loginService.register()
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrige los errores en el formulario.',
        life: 3000,
      });
      return;
    }
  }


  


}
