import { Component, inject, OnInit } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { Toast } from 'primeng/toast';
import { FormRegisterComponent } from './components/form-register.component';
import { ModalComponent } from '../../shared/ui/modal.component';
import { SwichService } from '../../../application/global/swich.service';
import { CustomInputComponent } from '../../shared/ui/input.component';
import { CustomSelectComponent } from '../../shared/ui/select.component';
import { UserFilerComponet } from './components/filters.component';

@Component({
  selector: 'app-users',
  imports: [
    Toast,
    FormRegisterComponent,
    ModalComponent,
    ButtonPrimaryComponent,
    UserFilerComponet,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  modalS = inject(SwichService);
  modalSwich: boolean = false;

  ngOnInit(): void {
    this.modalS.$modal.subscribe((valor) => (this.modalSwich = valor));
  }
  openmodal() {
    this.modalSwich = true;
  }
}
