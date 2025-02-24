import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { UploadService } from '../../../../application/services/upload.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../../application/utils/local-storage.service';
interface response {
  slot: number;
  alias: string;
  pin: string;
}
@Component({
  selector: 'upload-file',
  imports: [NgIf, CommonModule, ButtonPrimaryComponent],
  template: `
    <section
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full  overflow-hidden"
    >
      <div
        class="flex justify-center items-center cursor-pointer p-6 transition-all duration-300 flex-col h-full w-full"
        [ngClass]="{
          'bg-primary/80 text-white': isDragging,
          'hover:bg-primary/10': !isDragging
        }"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (drop)="onDrop($event)"
      >
        <div class="ping flex justify-center items-center  w-12 h-12">
          <i
            [class]="ICONS.UPLOAD"
            class="bg-primary/20 text-primary p-4 rounded-full z-50 "
          ></i>
        </div>

        <p class="text-xl font-medium text-center ">
          <span class="text-primary">Haga clic aquí </span>
          para cargar su archivo o <span class="text-primary">arrástrelo</span>
        </p>
        <input
          #fileInput
          type="file"
          class="hidden"
          (change)="onFileSelected($event)"
        />
      </div>
      <p
        *ngIf="fileName()"
        [ngClass]="{
          'animate-slide-up': fileName(),
          'border-red-400': !isDragging
        }"
        class="bg-white ring-1 rounded-md absolute bottom-[10vh] p-4 text-sm text-primary flex justify-center items-center gap-2 z-50 overflow-hidden "
      >
        <button
          class="absolute top-0 left-0 bg-primary text-white w-7 h-7 rounded-br-md"
          (click)="clear()"
        >
          x
        </button>
        <i [class]="ICONS.VALIDATE"></i>
        {{ fileName() }}

        <button-primary
          label="Firmar Documento"
          (clicked)="firmarDocumento()"
        />
      </p>
    </section>
  `,
})
export class UploadFile implements OnInit {
  ICONS = ICONS;
  isDragging = false;
  fileName = signal<string>('');
  fileBase64: string | null = null;
  serviceSign = inject(UploadService);
  private messageService = inject(MessageService);
  private localStorage = inject(LocalStorageService);
  ngOnInit(): void {
    const token = this.localStorage.getItem('tokenData');
    console.log(token);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  clear() {
    this.fileName.set('');
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.fileName.set(file.name);
      this.convertToBase64(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName.set(file.name);
      this.convertToBase64(file);
    }
  }

  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.fileBase64 = base64String.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  firmarDocumento() {
    const tokenData = this.localStorage.getItem('tokenData') as response;
    if (!tokenData) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe validar el token primero',
        life: 3000,
      });
      return;
    }

    if (!this.fileBase64) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe seleccionar un archivo',
        life: 3000,
      });
      return;
    }

    this.serviceSign
      .uploadFile({
        slot: tokenData.slot,
        alias: tokenData.alias,
        pin: tokenData.pin,
        pdf: this.fileBase64,
      })
      .subscribe({
        next: (response) => {
          console.log('respuesta del jacubitus', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Documento firmado correctamente',
            life: 3000,
          });
          this.clear();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error al firmar el documento',
            life: 3000,
          });
        },
      });
  }
}
