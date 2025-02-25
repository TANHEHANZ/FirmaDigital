import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { UploadService } from '../../../../application/services/upload.service';
import { TokenConnectedResponse } from '../../../../application/models/interfaces/connected';
import { MessageService } from 'primeng/api';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ICONS } from '../../../shared/ui/icons';
import { Toast } from 'primeng/toast';
import { CustomInputComponent } from '../../../shared/ui/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TokenService } from '../../../../application/services/token.service';
import { LocalStorageService } from '../../../../application/utils/local-storage.service';
import { TokenStateService } from '../../../../application/services/token-state.service';
interface response {
  slot: string;
  alias: string;
  pin: string;
}
@Component({
  selector: 'upload-validate',
  imports: [
    NgClass,
    ButtonPrimaryComponent,
    Toast,
    CustomInputComponent,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  template: `
    <section
      [ngClass]="{
        'border-red-400/50 ': !tokenData?.datos?.connected,
        'border-gray-300': tokenData?.datos?.connected
      }"
      class="rounded-xl p-4 flex flex-col gap-4 border-2 border-gray-300 relative overflow-auto w-[350px] h-full"
    >
      <div class="h-full">
        <p-toast></p-toast>
        <section class="flex flex-col flex-1 gap-2 justify-center p-2">
          <h3 class="text-2xl font-bold">¿Ya conenctaste tu token?</h3>
          <p>
            Recuerda que debes tener instalado
            <span class="bg-primary  text-white rounded-md text-sm px-2"
              >Jacubitus</span
            >
          </p>
          <button-primary
            [icon]="ICONS.VALIDATE"
            (clicked)="tokenConected()"
            label="Validar Token"
          />
        </section>
        @if(tokenData?.datos?.connected){
        <section class="bg-primary/10 p-4 rounded-lg mt-4">
          <h3 class="text-xl font-bold mb-4">Token Conectado</h3>
          @for(token of tokenData?.datos?.tokens; track token.slot){
          <div
            class="bg-white p-4 rounded-lg mb-2 shadow-sm cursor-pointer"
            (click)="seleccionar(token)"
            [ngClass]="{
              'border-2 border-primary': selectToken?.slot === token.slot
            }"
          >
            <p class="font-medium mb-2">Información del Token:</p>
            <div class="grid gap-2">
              <p>
                <span class="font-medium">Modelo:</span>
                <span class="ml-2">{{ token.model }}</span>
              </p>
              <p>
                <span class="font-medium">Slot:</span>
                <span class="ml-2">{{ token.slot }}</span>
              </p>
              <p>
                <span class="font-medium">Serial:</span>
                <span class="ml-2">{{ token.serial }}</span>
              </p>
            </div>
            @if(selectToken?.slot === token.slot) {
            <form class="mt-4 border-t pt-4" [formGroup]="form">
              <custom-input
                label="Ingrese el PIN"
                type="password"
                [control]="form.controls.pin"
              />
              <button-primary
                label="Validar PIN"
                (clicked)="validatePin()"
                class="mt-2"
              />
            </form>
            }
          </div>
          }
        </section>
        }
      </div>
    </section>
  `,
})
export class UploadValidateComponent implements OnInit {
  readonly conectToken = inject(UploadService);
  readonly messageService = inject(MessageService);
  readonly tokenService = inject(TokenService);
  private tokenStateService = inject(TokenStateService);

  ngOnInit(): void {
    // this.tokenStateService.getState().subscribe((state) => {
    //   if (state.slot) {
    //     this.form.patchValue({
    //       slot: state.slot,
    //     });
    //     this.alias = state.alias || '';
    //     this.selectToken = state.selectedToken;
    //   }
    // });
  }

  ICONS = ICONS;
  tokenData: any = null;
  selectToken: any = null;
  alias = '';

  form = new FormGroup({
    pin: new FormControl('', Validators.required),
    slot: new FormControl('', Validators.required),
  });

  tokenConected() {
    this.conectToken.getListToken().subscribe({
      next: (data) => {
        this.tokenData = data;
        if (data.datos.connected) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: data.mensaje,
            life: 3000,
          });
          this.form.patchValue({
            slot: data.datos.tokens[0].slot,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se encontraron Tokens',
            life: 3000,
          });
        }
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: e.message,
          life: 3000,
        });
      },
    });
  }

  seleccionar(token: any) {
    this.selectToken = token;
    this.form.patchValue({ slot: token.slot });
    this.tokenStateService.updateState({
      slot: token.slot,
    });
  }

  validatePin() {
    if (!this.form.value.pin) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El campo PIN no puede estar vacío.',
        life: 3000,
      });
      return;
    }

    this.tokenService
      .dataToken({
        slot: this.form.value.slot!,
        pin: this.form.value.pin!,
      })
      .subscribe({
        next: (value) => {
          if (!value.finalizado) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: value.mensaje,
              life: 3000,
            });
            return;
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: value.mensaje,
            life: 3000,
          });

          this.alias = value.datos.data_token.data[0].alias;
          this.tokenStateService.updateState({
            slot: this.form.value.slot!,
            alias: this.alias,
            pin: this.form.value.pin!,
          });
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err,
            life: 3000,
          });
        },
      });
  }
}
