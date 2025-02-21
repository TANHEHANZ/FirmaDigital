import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../application/services/user.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import { TokenService } from '../../../../application/services/token.service';
import { ResponseToken } from '../../../../application/models/interfaces/api/token/response';
@Component({
  selector: 'token-table',
  imports: [CommonModule, MenuModule],
  template: `
    <table class="w-full">
      <thead class="text-sm border-b border-gray-300  ">
        <tr class="">
          <th class="font-light text-start py-2">Nombre</th>
          <th class="font-light text-start py-2">Ci</th>
          <th class="font-light text-start py-2">Tipo usuario</th>
          <th class="font-light text-start py-2">Estado usuario</th>
          <th class="font-light text-start py-2">Tipo Token</th>
          <th class="font-light text-start py-2">Estado Token</th>
          <th class="font-light text-start py-2">Certificado</th>
          <th class="font-light text-start py-2">Emisor</th>
          <th class="font-light text-start py-2">Tiempo</th>
          <th class="font-light text-start py-2">Titular</th>
        </tr>
      </thead>
      <tbody class=" [&>*:nth-child(odd)]:bg-primary/15 ">
        @for (item of token; track $index) {
        <tr class="text-sm lowercase border-b border-gray-300 ">
          <td class="py-2">{{ item.User.name }}</td>
          <td class="py-2">{{ item.User.ci }}</td>
          <td class="py-2">{{ item.User.tipo_user }}</td>
          <td class="py-2">{{ item.User.estado_user }}</td>
          <td class="py-2">{{ item.tipo_token }}</td>
          <td class="py-2">{{ item.estado_token }}</td>
          <td class="py-2">{{ item.Certificado.tipo_certificado }}</td>
          <td class="py-2">{{ item.Certificado.Emisor.entidad }}</td>
          <td class="py-2">
            {{ item.Certificado.desde }} - {{ item.Certificado.hasta }}
          </td>
          <td class="py-2">{{ item.Certificado.titular.nombre }}</td>

          <td
            class="text-sm text-center"
            [ngClass]="{
              'text-green-600': item.estado_token === 'TRUE',
              'text-red-500': item.estado_token === 'FALSE'
            }"
          >
            <i [ngClass]="ICONS.STATUS"></i>
          </td>

          <td class=" text-center">
            <p-menu [model]="menuItems" [popup]="true" #menu></p-menu>
            <button (click)="menu.toggle($event)">
              <i [ngClass]="ICONS.MENU_VERTICAL"></i>
            </button>
          </td>
        </tr>
        }@empty {
        <td colspan="1000" class="text-center h-full">
          No hay registros de los tokens
        </td>
        }
      </tbody>
    </table>
  `,
})
export class TokenTable implements OnInit {
  toast = inject(MessageService);
  token: ResponseToken[] = [];
  tokenS = inject(TokenService);

  ICONS = ICONS;
  menuItems = [
    {
      label: 'Asignar Token',
      icon: 'pi pi-key',
      command: () => this.asignarToken(),
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.editarUsuario(),
    },
    {
      label: 'Dar de Baja',
      icon: 'pi pi-trash',
      command: () => this.darDeBajaUsuario(),
    },
  ];

  ngOnInit(): void {
    this.tokenS.getAllToken().subscribe({
      next: (value) => {
        this.token = Array.isArray(value.data) ? value.data : [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  asignarToken() {
    // Lógica para asignar token
    console.log('Asignando token...');
  }

  editarUsuario() {
    // Lógica para editar usuario
    console.log('Editando usuario...');
  }

  darDeBajaUsuario() {
    // Lógica para dar de baja al usuario
    console.log('Dando de baja usuario...');
  }
}
