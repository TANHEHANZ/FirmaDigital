import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/ui/button/primary.component';
import { ICONS } from '../../shared/ui/icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgClass } from '@angular/common';
import { ActiveService } from '../../../application/global/active.service';
import { ConectService } from '../../../application/services/conect.service';
import { TokenConnectedResponse } from '../../../application/models/interfaces/connected';
import { DrawerService } from '../../../application/global/drawer.service';
import { CustomInputComponent } from '../../shared/ui/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UploadService } from '../../../application/services/upload.service';
import { LocalStorageService } from '../../../application/utils/local-storage.service';
import { UploadValidateComponent } from './components/validate.token.component';
import { UploadFile } from './components/uplodad.file.component';

@Component({
  selector: 'app-upload',
  imports: [
    ToastModule,
    ReactiveFormsModule,
    UploadValidateComponent,
    UploadFile,
  ],
  templateUrl: './upload.component.html',
  providers: [MessageService],
})
export class ValidateComponent {
  readonly toast = inject(MessageService);
  readonly active = inject(ActiveService);
  readonly viewContnt = inject(ActiveService);
  readonly conectToken = inject(UploadService);
  readonly drawer = inject(DrawerService);
  readonly messageService = inject(MessageService);
  private local = inject(LocalStorageService);
  ICONS = ICONS;
  selectedToken: any;
  infoLocal = this.local.getItem('Informacion');
  infoUserSelected: any = null;

  peyloadToken = new FormGroup({
    slot: new FormControl(1, [Validators.required]),
    pin: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    console.log(this.infoUserSelected);
  }

  selectToken(token: any) {
    this.selectedToken = token;
    this.messageService.add({
      severity: 'success',
      summary: 'Token seleccionado',
      detail: this.selectedToken.name,
      life: 3000,
    });
    return;
  }

  validar() {
    this.conectToken.dataToken(this.peyloadToken.value).subscribe({
      next(value) {
        localStorage.setItem('Informacion', JSON.stringify(value.datos));
        // console.log(this.infoUserSelected);
      },
      error(err) {
        console.log(err);
      },
    });
    console.log(this.peyloadToken.value);
  }
}
