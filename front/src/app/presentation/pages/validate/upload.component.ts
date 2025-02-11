import { Component, inject, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgClass, NgFor } from '@angular/common';
import { WrapperComponent } from '../../layouts/private/wrapper.component';
import { ActiveService } from '../../../application/global/active.service';
import { ConectService } from '../../../application/services/conect.service';
import { TokenConnectedResponse } from '../../../application/models/interfaces/connected';

import { DrawerService } from '../../../application/global/drawer.service';
import { DrawerComponent } from '../../shared/drawer/drawer.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-upload',
  imports: [
    ButtonPrimaryComponent,
    ToastModule,
    NgClass,
    NgFor,
    WrapperComponent,
    DrawerComponent,
    ProfileComponent,
  ],
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
  tokenData: TokenConnectedResponse | null = null;
  selectedToken: any;
  error: string = '';
  message: string = '';
  ngOnInit() {
    this.conectToken.listToken().subscribe({
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
    if (this.selectToken.length > 0) {
      this.openDrawer('Información del Token');
    }
  }
  openDrawer(title?: string) {
    this.drawer.changeTitle(title ? title : 'Información del Token');
    this.drawer.changeDrawer();
  }
  Validate() {
    if (this.tokenData) {
      this.tokenData.datos.connected = true;
    }
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

  datos = [
    {
      nombre: 'LUIS FERNANDO ARGANDOÑA ESPADA',
      fechaHora: '2024-12-03T14:17:47.000-04:00',
      tipoDocumento: 'X509_CERTIFICATE',
      id_token: '6567867533',
      ip_equipo: '192.168.1.1',
      entidad: 'Entidad Certificadora Publica ADSIB',
    },
    {
      nombre: 'JUAN PÉREZ',
      fechaHora: '2024-10-01T10:30:00.000-04:00',
      tipoDocumento: 'PRIMARY_KEY',
      id_token: '1234567890',
      ip_equipo: '192.168.1.2',
      entidad: 'ADSIB',
    },
  ];
}
