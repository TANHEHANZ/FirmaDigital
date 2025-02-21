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
import { UserService } from '../../../../application/services/user.service';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { SwichService } from '../../../../application/global/swich.service';

@Component({
  selector: 'form-register',

  template: `
    <form
      [formGroup]="form"
      class="w-full flex justify-center items-center  gap-2"
    >
      <section class="flex flex-col justify-center items-center gap-2">
        <p class="text-2xl font-bold mb-4">Registro de Usuarios</p>
        <p class="self-start">Busca a un funcionario por el ci</p>
        <div class=" flex justify-center items-end  gap-2  w-full">
          <custom-input
            label="Ci"
            type="text"
            [control]="form.controls.ci"
            class=" w-[50%]"
          />
          <button-primary
            label="Buscar Usuario"
            (clicked)="validar()"
            class="w-[50%]"
          />
        </div>
        @if(informacion ){
        <section class=" flex w-full flex-col justify-center items-center">
          <section class=" grid grid-cols-3 gap-2">
            <custom-input
              class="w-full"
              label="Nombre"
              type="text"
              [control]="form.controls.name"
            />
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
              [control]="form.controls.unidad"
            />
            <custom-input
              class="w-full"
              label="Institucion"
              type="text"
              [control]="form.controls.institucion"
            />
            <custom-input
              class="w-full"
              label="Cargo"
              type="text"
              [control]="form.controls.cargo"
            />
            <custom-select
              label="Tipo persona:"
              [options]="[
                { label: 'Juridica', value: 'Juridica' },
                { label: 'Natural', value: 'Natural' }
              ]"
              [control]="form.controls.tipo_user"
            />

            <custom-input
              class="w-full"
              label="Contraseña"
              type="text"
              [control]="form.controls.password"
            />
            <custom-select
              label="Estado usuario:"
              [options]="[
                { label: 'Activo', value: 'TRUE' },
                { label: 'Bloqueado', value: 'FALSE' }
              ]"
              [control]="form.controls.is_active"
            />
          </section>
          <button-secundary
            class="self-end mt-4"
            [icon]="ICONS.SAVE"
            label="Registrar usuario"
            (clicked)="registerUser()"
          />
        </section>
        }
      </section>

      <!-- <section
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
      </section> -->
    </form>
    <div class="flex gap-2"></div>
  `,
  imports: [
    ButtonPrimaryComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    CommonModule,
    CustomSelectComponent,
    ButtonSecundaryComponent,
  ],
})
export class FormRegisterComponent {
  private userService = inject(UserService);
  readonly messageService = inject(MessageService);
  modalS = inject(SwichService);

  ICONS = ICONS;
  private router = inject(Router);
  informacion: any;

  form = new FormGroup({
    ci: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(9),
    ]),
    name: new FormControl('', [Validators.required]),
    institucion: new FormControl('', [Validators.required]),
    unidad: new FormControl('', [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    tipo_user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    is_active: new FormControl('', [Validators.required]),
  });
  validar() {
    if (!this.form.value.ci) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo CI no puede estar vacio.',
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
        this.informacion = response.data[0];
        console.log(this.informacion);
        this.form.patchValue({
          name: this.informacion.empleado || 'no se hallo el name',
          ci: this.informacion.ci || '',
          institucion: this.informacion.institucion || '',
          unidad: this.informacion.unidad || '',
          cargo: this.informacion.cargo || '',
          password: this.informacion.ci || '',
        });
      },
      error: (err) => {
        console.log(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Ocurrió un error inesperado',

          life: 3000,
        });
      },
    });
  }

  registerUser() {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Por favor, llene todos los campos o coriga los erroes del formulario .',
        life: 3000,
      });
      return;
    }
    this.userService
      .register({
        password: this.form.value.password ?? '',
        ci: this.form.value.ci ?? '',
        name: this.form.value.name ?? '',
        idRol: 'cm7eioao30000uoi0u812gr6z',
        tipo_user: this.form.value.tipo_user ?? '',
        is_active: this.form.value.is_active ?? '',
        cargo: this.form.value.cargo ?? '',
        institucion: this.form.value.institucion ?? '',
        unidad: this.form.value.unidad ?? '',
      })
      .subscribe({
        next: (response) => {
          if (response.status === 200 && response.data) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: response.message,
              life: 3000,
            });
          }
          this.modalS.$modal.emit(false);
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.errors || 'Ocurrió un error inesperado',
            life: 3000,
          });
        },
      });
  }
}
