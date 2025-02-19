import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { UploadService } from '../../../../application/services/upload.service';
import { TokenConnectedResponse } from '../../../../application/models/interfaces/connected';
import { MessageService } from 'primeng/api';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { ICONS } from '../../../shared/ui/icons';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'upload-validate',
  imports: [NgClass, ButtonPrimaryComponent, Toast],
  providers: [MessageService],
  template: `
    <section
      [ngClass]="{
        'border-red-400 ': !tokenData?.datos?.connected,
        'border-secundary': tokenData?.datos?.connected
      }"
      class="rounded-xl p-4 flex flex-col gap-4 border-2 border-gray-300 relative overflow-auto w-[350px] h-full"
    >
      <div>
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
      </div>
    </section>
  `,
})
export class UploadValidateComponent {
  readonly conectToken = inject(UploadService);
  tokenData: TokenConnectedResponse | null = null;
  readonly messageService = inject(MessageService);
  ICONS = ICONS;
  tokenDetectado = false;

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
          return;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se encontro Tokens',
          life: 3000,
        });
        return;
      },
      error: (e) => {
        console.log(e);
        this.messageService.add({
          severity: 'error',
          summary: e.name,
          detail: 'jacubitus no esta siendo ejecutado',
          life: 3000,
        });
      },
    });
  }

  constructor() {}
}
