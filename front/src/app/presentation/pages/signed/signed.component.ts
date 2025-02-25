import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
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
export class SignedComponent {}
