import { Component, input } from '@angular/core';
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
  template: `
    <section class="flex flex-col justify-center h-full">
      <h1 class="text-3xl font-normal my-8">Firmar Docunentos</h1>
      <p-toast></p-toast>

      <section class="flex w-full h-full gap-4">
        <upload-validate></upload-validate>
        <upload-file class="w-full"></upload-file>
        <file-signed></file-signed>
      </section>
    </section>
  `,
  providers: [MessageService],
})
export class SignedComponent {}
