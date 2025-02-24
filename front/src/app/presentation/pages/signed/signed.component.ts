import { Component, inject } from '@angular/core';
import { ICONS } from '../../shared/ui/icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActiveService } from '../../../application/global/active.service';
import { DrawerService } from '../../../application/global/drawer.service';
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
  templateUrl: './signed.component.html',
  providers: [MessageService],
})
export class SignedComponent {
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
      },
      error(err) {
        console.log(err);
      },
    });
    console.log(this.peyloadToken.value);
  }
}
