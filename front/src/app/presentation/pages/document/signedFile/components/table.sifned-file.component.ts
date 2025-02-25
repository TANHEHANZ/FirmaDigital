import { Component, inject } from '@angular/core';
import { DrawerComponent } from '../../../../shared/drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../application/services/user.service';
import { SwichService } from '../../../../../application/global/swich.service';
import { MessageService } from 'primeng/api';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { ICONS } from '../../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import InformationFile from './informacion-file.component';
import { SignedService } from '../../../../../application/services/signed.service';
import { responceSigned } from '../../../../../application/models/interfaces/api/signed';

@Component({
  imports: [DrawerComponent, CommonModule, MenuModule],
  selector: 'table-signed-file',
  template: `
    <section class="h-full ">
      <table class="w-full rounded-md overflow-hidden">
        <thead class="text-sm border-b border-gray-300  ">
          <th colspan="3" class="bg-primary p-2 text-white font-light ">
            Usuario firmador
          </th>
          <th colspan="6" class="bg-primary/70 p-2 text-white font-light ">
            informacion del documento firmado
          </th>
          <tr class="">
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Ci</th>
            <th class="font-light text-start p-2">Tipo</th>
            <th class="font-light text-start p-2">Fecha</th>
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Tipo</th>
            <th class="font-light text-start p-2">Historial</th>
            <th class="font-light text-start p-2">Estado</th>
            <th class="font-light text-start p-2">Acciones</th>
          </tr>
        </thead>
        <tbody
          class=" [&>*:nth-child(odd)]:bg-primary/10 [&>*:nth-child(even)]:bg-primary/2"
        >
          @for (item of data; track $index) {
          <tr class="text-sm lowercase border-b border-gray-300 ">
            <td class="p-2 ">{{ item.User.name }}</td>
            <td class="p-2 ">{{ item.User.ci }}</td>
            <td class="p-2 ">{{ item.User.tipo_user }}</td>
            <td class="p-2 ">{{ item.Documento.nombre }}</td>
            <td class="p-2 ">{{ item.Documento.tipo_documento }}</td>
            <td class="p-2 ">
              <!-- {{
              item.Documento.id_historial.length > 0
                ? 'ver histotial'
                : 'Unico registro'
            }} -->
              ver histotial
            </td>
            <td class="p-2 ">{{ item.fecha | date : 'short' }}</td>

            <td class="p-2 flex justify-center items-center">
              <p
                class="text-sm border rounded-xl text-center px-4  "
                [ngClass]="{
                  'border-primary text-primary':
                    item.Documento.estado === 'ACTIVO',
                  'border-error text-error':
                    item.Documento.estado === 'ELIMINADO',
                  'border-processing text-processing':
                    item.Documento.estado === 'EDITADO',
                  'border-gray-400 text-graborder-gray-400':
                    item.Documento.estado === 'DESHABILITADO'
                }"
              >
                {{ item.Documento.estado }}
              </p>
            </td>

            <td class="p-2 text-center">
              <p-menu
                [model]="getMenuItems(item)"
                [popup]="true"
                #menu
                class=""
              ></p-menu>
              <button (click)="menu.toggle($event)" class="  w-full h-full">
                <i [ngClass]="ICONS.MENU_VERTICAL"></i>
              </button>
            </td>
          </tr>
          }@empty {
          <p>No hay Datos de usuarios</p>
          }
        </tbody>
      </table>
    </section>
    <app-drawer>
      <ng-container *ngIf="drawerService.getContent() | async as content">
        <ng-container *ngComponentOutlet="content"></ng-container>
      </ng-container>
    </app-drawer>
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

  getMenuItems(user: any) {
    return [
      {
        label: 'Asignar Token',
        command: () => this.asignarToken(user),
      },
      {
        label: 'Informacion del usuario',
        command: () => this.iformacion(user),
      },
      {
        label: 'Editar usuario',
        command: () => this.editarUsuario(),
      },
      {
        label: 'Inhabilitar',
        command: () => this.darDeBajaUsuario(),
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
        this.data = response.data as responceSigned[];
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  asignarToken(event: any) {
    this.modalS.$modal.emit('assign-token');
    this.modalS.setData(this.user);
  }

  editarUsuario() {
    this.modalS.$modal.emit('register');
  }

  iformacion(selectedUser: any) {
    console.log(selectedUser);
    this.drawerService.openDrawer(
      'Informacion del usuario',
      InformationFile,
      selectedUser
    );
  }

  darDeBajaUsuario() {
    // Lógica para dar de baja al usuario
    console.log('Dando de baja usuario...');
  }
}
