import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './services/upload.service';
import { peyload_pdf } from './models/signPdf';

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <form>
      <input
        type="file"
        (change)="onFileSelected($event)"
        accept=".pdf,.jpg,.png"
      />
      <button type="button" (click)="onSubmit($event)">Subir archivo</button>
      <p>
        {{ pdf_reponse }}
      </p>
    </form>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'formJacubitus';
  fileBase64: string | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      this.fileBase64 = dataUrl.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.fileBase64) {
      this.sendFileToService(this.fileBase64);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  serviceSign = inject(UploadService);
  dataUpload: peyload_pdf = {
    slot: 1,
    alias: '6567867533',
    pin: '15520557',
    pdf: '',
  };

  pdf_reponse = '';
  constructor() {
    console.log(this.pdf_reponse);
  }

  sendFileToService(base64File: string) {
    this.serviceSign
      .uploadFile({
        ...this.dataUpload,
        pdf: base64File,
      })
      .subscribe((data) => {
        this.pdf_reponse = data.datos.pdf_firmado;
        this.downloadFile(this.pdf_reponse, 'documento_firmado.pdf');
      });
  }
  downloadFile(base64: string, fileName: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}
