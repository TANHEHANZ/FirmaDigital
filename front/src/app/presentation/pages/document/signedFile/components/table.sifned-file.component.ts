import { Component, inject } from '@angular/core';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../application/services/user.service';
import { SwichService } from '../../../../../application/global/swich.service';
import { MenuItem, MessageService } from 'primeng/api';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { ICONS } from '../../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import InformationFile from './informacion-file.component';
import { SignedService } from '../../../../../application/services/signed.service';
import { responceSigned } from '../../../../../application/models/interfaces/api/signed';
import { ButtonSecundaryComponent } from '../../../../shared/ui/button/secundary.component';
import StatusBadgeComponent from '../../../../shared/ui/status';

@Component({
  imports: [
    CommonModule,
    MenuModule,
    ButtonSecundaryComponent,
    StatusBadgeComponent,
  ],
  selector: 'table-signed-file',
  template: `
    <section class="  w-full">
      <article class=" overflow-y-scroll h-[50dvh]">
        <table class="w-full rounded-md">
          <thead class="text-sm border-b border-gray-300">
            <th colspan="3" class="bg-secundary p-2 text-white font-light ">
              Usuario firmador
            </th>
            <th colspan="6" class="bg-terteary p-2 font-light ">
              informacion del documento firmado
            </th>
            <tr class="">
              <th class="font-light text-start p-2">Nombre</th>
              <th class="font-light text-start p-2">Ci</th>
              <th class="font-light text-start p-2">Persona</th>
              <th class="font-light text-start p-2">Nombre</th>
              <th class="font-light text-start p-2">Tipo</th>
              <th class="font-light text-start p-2">Fecha</th>
              <th class="font-light text-start p-2">Estado</th>
            </tr>
          </thead>
          <tbody
            class=" [&>*:nth-child(odd)]:bg-terteary/15 [&>*:nth-child(even)]:bg-secundary/2"
          >
            @for (item of data; track $index) {
            <tr class="text-sm lowercase border-b border-gray-300 ">
              <td class="py-3 ">{{ item.User.name }}</td>
              <td class="py-3 ">{{ item.User.ci }}</td>
              <td class="py-3 ">{{ item.User.tipo_user }}</td>
              <td class="py-3 ">{{ item.Documento.nombre }}</td>
              <td class="py-3 ">{{ item.Documento.tipo_documento }}</td>
              <td class="py-3 ">{{ item.fecha | date : 'short' }}</td>
              <td class="py-3">
                <status-badge [estado]="item.Documento.estado" />
              </td>

              <td class="p-2 text-center">
                <p-menu
                  [model]="getMenuItems(item)"
                  [popup]="true"
                  #menu
                ></p-menu>
                <button
                  (click)="menu.toggle($event)"
                  class="w-full h-full px-3"
                >
                  <i [ngClass]="ICONS.MENU_VERTICAL"></i>
                </button>
              </td>
            </tr>
            }@empty {
            <p>No hay Datos de usuarios</p>
            }
          </tbody>
        </table>
      </article>
      <div class="flex justify-end items-center gap-4 my-2">
        <div class="flex justify-center items-center gap-4">
          <p class="text-sm">Filas por pagina</p>
          <select class=" border border-primary p-2 rounded-md">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        <button-secundary [icon]="ICONS.LEFT"> </button-secundary>
        <button-secundary [icon]="ICONS.RIGHT"> </button-secundary>
      </div>
    </section>
  `,
})
export default class TableSignedFile {
  signedService = inject(SignedService);
  toast = inject(MessageService);
  modalS = inject(SwichService);
  drawerService = inject(DrawerService);
  user: any[] = [];
  ICONS = ICONS;
  data: responceSigned[] = [];
  pageSizeOptions: any[] = [
    { label: '5', value: 5 },
    { label: '10 ', value: 10 },
    { label: '25', value: 25 },
  ];
  getMenuItems(item: any): MenuItem[] {
    return [
      {
        label: 'Validar documento',
        icon: 'ri-checkbox-circle-line',
        command: () => this.validarDocumento(item),
      },
      {
        label: 'Ver Historial',
        icon: 'ri-history-line',
        command: () => this.Historial(item),
      },
      {
        label: 'Actualizar y firmar',
        icon: 'ri-file-edit-line',
        tooltipOptions: {
          tooltipLabel: 'Subir nueva versión del documento y firmar',
          tooltipPosition: 'left' as const,
        },
        command: () => this.actualizarYFirmar(item),
      },
    ];
  }

  ngOnInit(): void {
    this.signed();
  }

  signed() {
    this.signedService.docuemntsSigned().subscribe({
      next: (response) => {
        console.log(response);
        this.data = response.data.slice(0, 10) as responceSigned[];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  validarDocumento(event: any) {
    console.log(event);
  }

  editarUsuario() {
    this.modalS.$modal.emit('register');
  }

  Historial(signed: any) {
    console.log(signed);
    this.drawerService.openDrawer(
      'Historial del documento ',
      InformationFile,
      signed
    );
  }
  actualizarYFirmar(documento: any) {
    this.modalS.$modal.emit('actualizar');
    this.modalS.setData({
      originalDocument: documento,
      type: 'update',
    });
  }
  darDeBajaUsuario() {
    console.log('Dando de baja usuario...');
  }
}
