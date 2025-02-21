import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../application/services/user.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
@Component({
  selector: 'token-table',
  imports: [CommonModule, MenuModule],
  template: `
    <table class="w-full">
      <thead class="text-sm border-b border-gray-300  ">
        <tr class="">
          <th class="font-light text-start py-2">Nombre</th>
          <th class="font-light text-start py-2">Ci</th>
          <th class="font-light text-start py-2">Tipo</th>
          <th class="font-light text-start py-2">Unidad</th>
          <th class="font-light text-start py-2">Institucion</th>
          <th class="font-light text-start py-2">Cargo</th>
          <th class="font-light text-start py-2">Estado</th>
          <th class="font-light text-start py-2">Rol</th>
          <th class="font-light text-start py-2">Acciones</th>
        </tr>
      </thead>
      <tbody class=" [&>*:nth-child(odd)]:bg-primary/15 ">
        @for (item of user; track $index) {
        <tr class="text-sm lowercase border-b border-gray-300 ">
          <td class="py-2">{{ item.name }}</td>
          <td class="">{{ item.ci }}</td>
          <td class="">{{ item.tipo_user }}</td>
          <td class="">{{ item.unidad }}</td>
          <td class="">{{ item.institucion }}</td>
          <td class="">{{ item.cargo }}</td>
          <td
            class="text-sm text-center"
            [ngClass]="{
              'text-green-600': item.is_active === 'TRUE',
              'text-red-500': item.is_active === 'FALSE'
            }"
          >
            <i [ngClass]="ICONS.STATUS"></i>
          </td>
          <td class="">{{ item.rol.tipo }}</td>
          <td class=" text-center">
            <p-menu [model]="menuItems" [popup]="true" #menu></p-menu>
            <button (click)="menu.toggle($event)">
              <i [ngClass]="ICONS.MENU_VERTICAL"></i>
            </button>
          </td>
        </tr>
        }@empty {
        <p>No hay Datos de usuarios</p>
        }
      </tbody>
    </table>
  `,
})
export class TokenTable implements OnInit {
  userS = inject(UserService);
  toast = inject(MessageService);
  user: any[] = [];
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
    this.userS.getAllUser().subscribe({
      next: (value) => {
        this.user = value.data;
        console.log(this.user);
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Ocurrio un error inseperado',
          life: 3000,
        });
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
