import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../application/services/user.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ICONS } from '../../../shared/ui/icons';
import { MenuModule } from 'primeng/menu';
import { SwichService } from '../../../../application/global/swich.service';
import { DrawerService } from '../../../../application/global/drawer.service';
import { DrawerComponent } from '../../../shared/drawer/drawer.component';
import { UserFilerComponet } from './filters.component';
import { InformacionUserComponent } from './informacion-user.component';
import { state } from '@angular/animations';
import { ButtonSecundaryComponent } from '../../../shared/ui/button/secundary.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'user-table',
  imports: [CommonModule, MenuModule, ButtonSecundaryComponent],
  template: `
    <article class=" overflow-y-scroll max-h-[70dvh] ">
      <table class="w-full">
        <thead class="text-sm border-b border-gray-300  ">
          <tr class="">
            <th class="font-light text-start p-2">Nombre</th>
            <th class="font-light text-start p-2">Ci</th>
            <th class="font-light text-start p-2">Tipo</th>
            <th class="font-light text-start p-2">Unidad</th>
            <th class="font-light text-start p-2">Institucion</th>
            <th class="font-light text-start p-2">Cargo</th>
            <th class="font-light text-start p-2">Estado</th>
            <th class="font-light text-start p-2">Rol</th>
            <th class="font-light text-start p-2">Acciones</th>
          </tr>
        </thead>
        <tbody
          class=" [&>*:nth-child(odd)]:bg-primary/10 [&>*:nth-child(even)]:bg-primary/2"
        >
          @for (item of user; track $index) {
          <tr class="text-sm lowercase border-b border-gray-300 ">
            <td class="p-2 ">{{ item.name }}</td>
            <td class="p-2 ">{{ item.ci }}</td>
            <td class="p-2 ">{{ item.tipo_user }}</td>
            <td class="p-2 ">{{ item.unidad }}</td>
            <td class="p-2 ">{{ item.institucion }}</td>
            <td class="p-2 ">{{ item.cargo }}</td>
            <td class="p-2 flex justify-center items-center">
              <p
                class="text-sm border rounded-xl text-center px-4  "
                [ngClass]="{
                  'border-primary text-primary': item.estado_user === 'ACTIVO',
                  'border-error text-error': item.estado_user === 'ELIMINADO',
                  'border-processing text-processing':
                    item.estado_user === 'EDITADO',
                  'border-gray-400 text-graborder-gray-400':
                    item.estado_user === 'DESHABILITADO'
                }"
              >
                {{ item.estado_user }}
              </p>
            </td>
            <td class="p-2 ">{{ item.rol.tipo }}</td>
            <td class="p-2 text-center">
              <p-menu
                [model]="getMenuItems(item)"
                [popup]="true"
                #menu
              ></p-menu>
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
  `,
})
export class UserTable implements OnInit, OnDestroy {
  userS = inject(UserService);
  toast = inject(MessageService);
  modalS = inject(SwichService);
  drawerService = inject(DrawerService);
  user: any[] = [];
  ICONS = ICONS;
  subscription!: Subscription;
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
        command: () => this.editarUsuario(user),
      },
      {
        label: user.estado_user === 'ACTIVO' ? 'Inhabilitar' : 'Habilitar',
        command: () => this.cambiarEstadoUsuario(user),
      },
    ];
  }

  ngOnInit(): void {
    this.loadUsers();

    this.subscription = this.userS.refresh$.subscribe(() => {
      this.loadUsers();
    });
  }
  loadUsers() {
    this.userS.getAllUser().subscribe((data) => {
      this.user = data;
    });
  }
  asignarToken(selectedUser: any) {
    this.modalS.$modal.emit('assign-token');
    this.modalS.setData(selectedUser);
  }

  editarUsuario(use: any) {
    this.modalS.$modal.emit('register');
  }

  iformacion(selectedUser: any) {
    console.log(selectedUser);
    this.drawerService.openDrawer(
      'Informacion del usuario',
      InformacionUserComponent,
      selectedUser
    );
  }

  cambiarEstadoUsuario(selectedUser: any) {
    const newState =
      selectedUser.estado_user === 'ACTIVO' ? 'DESHABILITADO' : 'ACTIVO';
    this.userS.unsubscribe(selectedUser.id, newState).subscribe({
      next: (value) => {
        this.toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: value.message,
          life: 3000,
        });
        selectedUser.estado_user = newState;
      },
      error: (err) => {
        this.toast.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message || 'Ocurrió un error inesperado',
          life: 3000,
        });
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
