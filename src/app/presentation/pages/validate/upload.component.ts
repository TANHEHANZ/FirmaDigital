import { Component, inject, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgClass, NgIf } from '@angular/common';
import { WrapperComponent } from '../../layouts/private/wrapper.component';
import { ActiveService } from '../../../application/global/active.service';
import { ConectService } from '../../../application/services/conect.service';
import { TokenConnectedResponse } from '../../../application/models/interfaces/connected';
import { tokenData } from '../../../application/models/mocks/tokenData';
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

  ICONS = ICONS;
  tokenData: any;
  selectedToken: any;
  error: string = '';
  message: string = '';
  ngOnInit() {
    this.conectToken.conectedToken().subscribe({
      next: (data) => {
        this.tokenData = data;
      },
      error: (e) => {
        this.error = e;
      },
    });
  }
  selectToken(token: any) {
    this.selectedToken = token;
    this.showToast(
      `Se ha seleccionado el token: ${token.name} (${token.model})`
    );
  }

  Validate() {
    this.tokenData.datos.connected = true;
    this.drawer.changeDrawer();
    this.showToast(
      `Se detecto el token: ${this.selectedToken.name} (${this.selectedToken.model})`,
      'Token detectado'
    );
  }

  showToast(message: string, title?: string, acion?: string) {
    this.toast.add({
      severity: acion ? acion : 'success',
      summary: title ? title : 'ESTADOS',
      detail: message,
    });
  }
}
