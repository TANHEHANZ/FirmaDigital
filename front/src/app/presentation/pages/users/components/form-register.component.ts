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

@Component({
  selector: 'form-register',

  template: `
    <form
      [formGroup]="form"
      class="w-full flex justify-center items-center  gap-2"
    >
      <section class="flex flex-col justify-center items-center gap-2">
        <div class=" flex justify-center items-end  gap-2  w-full">
          <custom-input label="Ci" type="text" [control]="form.controls.ci" />
          <button-primary label="Buscar Usuario" (clicked)="validar()" />
        </div>
        @if(informacion ){
        <section class=" flex w-full flex-col justify-center items-center">
          <section class=" grid grid-cols-2 gap-2">
            <custom-input
              class="w-full"
              label="Nombre"
              type="text"
              [control]="form.controls.nombre"
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
            />

            <custom-input
              class="w-full"
              label="Contraseña"
              type="text"
              [control]="form.controls.ci"
            />
            <custom-select
              label="Estado usuario:"
              [options]="[
                { label: 'Activo', value: 'Activo' },
                { label: 'Bloqueado', value: 'Bloqueado' }
              ]"
            />
          </section>
          <button-secundary
            class="self-end mt-4"
            [icon]="ICONS.SAVE"
            label="Registrar usuario"
            (clicked)="validar()"
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
  private loginService = inject(AuthService);
  private userService = inject(UserService);
  readonly messageService = inject(MessageService);
  ICONS = ICONS;
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
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(9),
    ]),
    institucion: new FormControl('', [Validators.required]),
    unidad: new FormControl('', [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    tipo_persona: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  validar() {
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
          nombre: this.informacion.empleado || 'no se hallo el nombre',
          ci: this.informacion.ci || '',
          institucion: this.informacion.institucion || '',
          unidad: this.informacion.unidad || '',
          cargo: this.informacion.cargo || '',
        });
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
}
