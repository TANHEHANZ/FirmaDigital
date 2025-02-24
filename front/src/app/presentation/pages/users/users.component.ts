import { Component, inject, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { Toast } from 'primeng/toast';
import { FormRegisterComponent } from './components/form-register.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { SwichService } from '../../../application/global/swich.service';
import { UserFilerComponet } from './components/filters.component';
import { UserTable } from './components/table.component';
import { TokenAssignComponent } from './components/token-assign.component';

@Component({
  selector: 'app-users',
  imports: [
    Toast,
    FormRegisterComponent,
    ModalComponent,
    ButtonPrimaryComponent,
    UserFilerComponet,
    UserTable,
    TokenAssignComponent,
  ],
  template: `
    <section class="flex justify-center items-start flex-col h-full p-8">
      <h1 class="text-2xl font-bold my-2">Administrar usuarios</h1>
      <section class="w-full">
        <p-toast></p-toast>
        <section class="flex justify-between w-full gap-8">
          <user-filter></user-filter>
          <button-primary
            (clicked)="openModal('register')"
            label="Registrar usuario"
            label="Registrar usuario"
          ></button-primary>
        </section>
        @if(currentModal !== null) {
        <modal>
          @if(currentModal === 'register') {
          <form-register></form-register>
          } @if(currentModal === 'assign-token') {
          <token-assign></token-assign>
          }
        </modal>
        }
        <section class="border border-gray-300 rounded-md min-h-[70vh]">
          <user-table></user-table>
        </section>
      </section>
    </section>
  `,
})
export class UsersComponent implements OnInit {
  modalS = inject(SwichService);
  currentModal: string | null = null;

  ngOnInit(): void {
    this.modalS.$modal.subscribe((valor) => (this.currentModal = valor));
  }
  openModal(type: string) {
    this.modalS.$modal.emit(type);
  }
}
