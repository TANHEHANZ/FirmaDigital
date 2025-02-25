import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadValidateComponent } from './components/validate.token.component';
import { UploadFile } from './components/uplodad.file.component';
import { FileSigned } from './components/file-signed.component';

@Component({
  selector: 'app-upload',
  imports: [
    ToastModule,
    ReactiveFormsModule,
    UploadValidateComponent,
    UploadFile,
    FileSigned,
  ],
  templateUrl: './signed.component.html',
  providers: [MessageService],
})
export class SignedComponent {}
