import { Component, inject, OnInit } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../../../application/services/token.service';

@Component({
  selector: 'form-token',
  imports: [
    CustomInputComponent,
    ButtonPrimaryComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `<Form class="p-4 flex flex-col gap-4" [formGroup]="validar">
    <h2 class="text-2xl font-bold text-center">
      Formulario registro de tokens
    </h2>
    <section>
      <p>
        <i [ngClass]="ICONS.INFO"></i>
        Debes tener instalado
        <span class="text-primary border-b cursor-pointer">Jacubitus</span>
      </p>
      <p>
        <i [ngClass]="ICONS.INFO"></i>
        Debes tener
        <span class="text-primary border-b cursor-pointer">Jacubitus</span>
        funcionando
      </p>

      <custom-input
        class="w-full"
        label="Ingresa el ping "
        type="text"
        [control]="validar.controls.ping"
      />
      <button-primary
        label="Validar Token"
        (clicked)="registrar()"
        class="w-[50%]"
      />
    </section>
  </Form>`,
})
export class FormTokenComponet implements OnInit {
  ICONS = ICONS;
  toast = inject(MessageService);
  tokenS = inject(TokenService);
  slot = null;
  validar = new FormGroup({
    ping: new FormControl('', [Validators.required, Validators.min(7)]),
  });
  ngOnInit(): void {
    this.tokenS.getListToken().subscribe({
      next: (value) => {
        if (!value.datos.connected) {
          this.toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error Token  no conectado',
            life: 3000,
          });
        }
        this.slot = value.datos.tokens[0].slot;
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error jacubitus no esta siendo ejecutado ',
          life: 3000,
        });
      },
    });
  }
  registrar() {
    if (!this.validar.value.ping) {
      this.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo ping no puede estar vacio.',
        life: 3000,
      });
    }
    // this.tokenS.dataToken()
  }
}
