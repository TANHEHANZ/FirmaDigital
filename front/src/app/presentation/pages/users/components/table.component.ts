import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../application/services/user.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';

@Component({
  selector: 'user-table',
  imports: [CommonModule],
  template: `
    <table class="w-full">
      <thead class="text-sm border-b border-gray-300">
        <tr class="">
          <th class="font-light py-2">Nombre</th>
          <th class="font-light py-2">Ci</th>
          <th class="font-light py-2">Tipo</th>
          <th class="font-light py-2">Unidad</th>
          <th class="font-light py-2">Institucion</th>
          <th class="font-light py-2">Cargo</th>
          <th class="font-light py-2">Estado</th>
          <th class="font-light py-2">Rol</th>
          <th class="font-light py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
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
          <td class="flez justify-center items-center text-center">
            <button>
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
export class UserTable implements OnInit {
  userS = inject(UserService);
  toast = inject(MessageService);
  user: any[] = [];
  ICONS = ICONS;
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
}
