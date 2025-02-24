import { Component, inject } from '@angular/core';
import { ModalComponent } from '../../shared/ui/modal.component';
import { SwichService } from '../../../application/global/swich.service';
import { Toast } from 'primeng/toast';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { TokenFiltersComponet } from './components/filers.token.component';
import { TokenTable } from './components/token.table.component';
import { FormTokenComponet } from './components/form.component';

@Component({
  selector: 'app-token',
  imports: [
    FormTokenComponet,
    ModalComponent,
    Toast,
    ButtonPrimaryComponent,
    TokenFiltersComponet,
    TokenTable,
  ],
  template: `
    <section class="flex justify-center items-start flex-col h-full p-8">
      <h1 class="text-2xl font-bold my-2">Administrar Tokens</h1>
      <section class="w-full">
        <p-toast></p-toast>
        <section class="flex justify-between w-full gap-8">
          <token-filter></token-filter>
          <button-primary
            (clicked)="openModal('register')"
            label="Nuevo Token"
          ></button-primary>
        </section>

        @if(currentModal !== null) {
        <modal>
          @if(currentModal === 'register') {
          <form-token></form-token>

          }
        </modal>
        }

        <section class="border border-gray-300 rounded-md min-h-[70vh]">
          <token-table></token-table>
        </section>
      </section>
    </section>
  `,
})
export class TokenComponent {
  modalS = inject(SwichService);
  currentModal: string | null = null;

  ngOnInit(): void {
    this.modalS.$modal.subscribe((valor) => (this.currentModal = valor));
  }
  openModal(type: string) {
    this.modalS.$modal.emit(type);
  }
}
