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
    <table class="w-full table-fixed">
      <thead class="text-sm border-b border-gray-300">
        <tr>
          <th class="font-light text-start py-2 w-1/6">Titular</th>
          <th class="font-light text-start py-2 w-1/6">Ci</th>
          <th class="font-light text-start py-2 w-1/6">Descripcion</th>
          <th class="font-light text-start py-2 w-1/6">Email</th>
          <th class="font-light text-start py-2 w-1/6">Emisor</th>
          <th class="font-light text-start py-2 w-1/6">Tipo Certificado</th>
        </tr>
      </thead>
      <tbody class=" [&>*:nth-child(odd)]:bg-primary/15">
        @for (item of token; track $index) {
        <tr class="text-sm lowercase border-b border-gray-300">
          <td class="py-2 truncate" (click)="menu.toggle($event)">
            {{ item.Certificado.titular.nombre }}
          </td>
          <td class="py-2 w-[8vw]" (click)="menu.toggle($event)">
            {{ item.Certificado.titular.ci }}
          </td>
          <td class="py-2 truncate" (click)="menu.toggle($event)">
            {{ item.Certificado.titular.descripcion }}
          </td>
          <td class="py-2 truncate" (click)="menu.toggle($event)">
            {{ item.Certificado.titular.email }}
          </td>
          <td class="py-2 truncate" (click)="menu.toggle($event)">
            {{ item.Certificado.Emisor.entidad }}
          </td>
          <td class="py-2 truncate" (click)="menu.toggle($event)">
            {{ item.Certificado.tipo_certificado }}
          </td>

          <td class="text-center">
            <p-menu [model]="menuItems" [popup]="true" #menu></p-menu>
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
      label: 'Ver mas información',
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
        console.log(this.token);
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
