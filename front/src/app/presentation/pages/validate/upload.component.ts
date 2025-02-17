import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgClass } from '@angular/common';
import { WrapperComponent } from '../../layouts/private/wrapper.component';
import { ActiveService } from '../../../application/global/active.service';
import { ConectService } from '../../../application/services/conect.service';
import { TokenConnectedResponse } from '../../../application/models/interfaces/connected';
import { DrawerService } from '../../../application/global/drawer.service';

@Component({
  selector: 'app-upload',
  imports: [ButtonPrimaryComponent, ToastModule, NgClass, WrapperComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  providers: [MessageService],
})
export class ValidateComponent {
  readonly toast = inject(MessageService);
  readonly active = inject(ActiveService);
  readonly viewContnt = inject(ActiveService);
  readonly conectToken = inject(ConectService);
  readonly drawer = inject(DrawerService);
  readonly messageService = inject(MessageService);
  ICONS = ICONS;
  tokenData: TokenConnectedResponse | null = null;
  selectedToken: any;
  error: string = '';
  message: string = '';
  ngOnInit() {}
  tokenConected() {
    this.conectToken.listToken().subscribe({
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

  selectToken(token: any) {
    this.selectedToken = token;
    this.showToast(
      `Se ha seleccionado el token: ${token.name} (${token.model})`
    );
    if (this.selectToken.length > 0) {
      this.openDrawer('Información del Token');
    }
  }
  openDrawer(title?: string) {
    this.drawer.changeTitle(title ? title : 'Información del Token');
    this.drawer.changeDrawer();
  }
  Validate() {
    this.tokenConected();
  }

  showToast(message: string, title?: string, acion?: string) {
    this.toast.add({
      severity: acion ? acion : 'success',
      summary: title ? title : 'ESTADOS',
      detail: message,
    });
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-upload',
//   imports: [],
//   template: 'Firmar',
// })
// export class ValidateComponent {}

// verificar el prblema de rendimiento
