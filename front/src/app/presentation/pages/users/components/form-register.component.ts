import { Toast } from 'primeng/toast';
import { Component, inject, NgModule } from '@angular/core';
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
import { UserService } from '../../../../application/services/user.service';
import { infoUser } from '../../../../application/models/interfaces/api/infoUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-register',

  template: `
    <form
      [formGroup]="form"
      class="w-full flex justify-center items-center  gap-2"
    >
      <section class="flex flex-col justify-center items-center gap-2">
        <div class=" flex justify-center items-center  gap-2">
          <custom-input label="Ci" type="text" [control]="form.controls.ci" />
          <button-primary label="Buscar Usuario" (clicked)="validar()" />
        </div>
        @if(informacion && informacion.length >0){
        <custom-input
          class="w-full"
          label="Contraseña"
          type="text"
          [control]="form.controls.ci"
        />
        }
      </section>

      <section
        class="min-w-[30vw] border border-gray-300 min-h-72 flex justify-center items-center flex-col rounded-md"
      >
        @for(item of informacion; track item.ci){
        <p>Empleado: {{ item.empleado }}</p>
        <p>CI: {{ item.ci }}</p>
        <p>Unidad: {{ item.unidad }}</p>
        <p>Cargo: {{ item.cargo }}</p>
        <p>Institución: {{ item.institucion }}</p>
        }@empty {
        <p>Informacion del usuario</p>
        }
      </section>
    </form>
    <div class="flex gap-2"></div>
  `,
  imports: [
    ButtonPrimaryComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class FormRegisterComponent {
  private loginService = inject(AuthService);
  private userService = inject(UserService);
  readonly messageService = inject(MessageService);
  private router = inject(Router);
  informacion: any;
  visibleform() {
    this.router.navigate(['/login']);
  }
  form = new FormGroup({
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(9),
    ]),
  });
  validar() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrige los errores en el formulario.',
        life: 3000,
      });
      return;
    }
    this.userService.infoUsre(this.form.value.ci ?? '').subscribe({
      next: (response) => {
        if (response.status === 200 && response.data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: response.message,
            life: 3000,
          });
        }
        this.informacion = response.data;
        console.log(this.informacion);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      },
    });
  }

  // register() {
  //   console.log(this.form.value);
  //   if (this.form.invalid) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Por favor, corrige los errores en el formulario.',
  //       life: 3000,
  //     });
  //     return;
  //   }
  //   this.loginService
  //     .register({
  //       email: this.form.value.email ?? '',
  //       password: this.form.value.password ?? '',
  //       ci: this.form.value.ci ?? '',
  //       name: this.form.value.name ?? '',
  //       idRol: '1',
  //       idUnidad: this.form.value.idUnidad ?? '',
  //       tipo_user: 'Natural',
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         if (response.status === 200 && response.data) {
  //           localStorage.setItem(ACCESS_TOKEN, response.data[0].accessToken);
  //           localStorage.setItem(REFRESH__TOKEN, response.data[0].refreshToken);

  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Éxito',
  //             detail: response.message,
  //             life: 3000,
  //           });
  //           this.router.navigate([PATH_ROUTES.LOGOUT]);
  //         }
  //       },
  //       error: (error: any) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: error.error?.message || 'Ocurrió un error inesperado',
  //           life: 3000,
  //         });
  //       },
  //     });
  // }
}
