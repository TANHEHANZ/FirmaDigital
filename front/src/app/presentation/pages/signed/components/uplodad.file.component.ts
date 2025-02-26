import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';
import { UploadService } from '../../../../application/services/upload.service';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../../application/utils/local-storage.service';
import { TokenStateService } from '../../../../application/services/token-state.service';
interface response {
  slot: number;
  alias: string;
  pin: string;
}
@Component({
  selector: 'upload-file',
  imports: [NgIf, CommonModule],
  template: `
    <section
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full  overflow-hidden"
    >
      <div
        class="flex justify-center items-center cursor-pointer p-6 transition-all duration-300 flex-col h-full w-full gap-4"
        [ngClass]="{
          'bg-primary/80 text-white': isDragging,
          'hover:bg-primary/10': !isDragging
        }"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (drop)="onDrop($event)"
      >
        <p
          class="ping bg-primary h-12 w-12 flex justify-center items-center text-white p-4 rounded-full"
        >
          <i [class]="ICONS.UPLOAD"></i>
        </p>
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
      <div
        *ngIf="fileName()"
        [ngClass]="{
          'animate-slide-up': fileName(),
          'border-red-400': !isDragging
        }"
        class="bg-white ring-1 rounded-md absolute bottom-[10vh] p-4 text-sm text-primary flex flex-col justify-between items-center gap-4 z-50 overflow-hidden"
      >
        <span>{{ fileName() }}</span>
        <div class="flex gap-2">
          <button
            class="border border-primary  rounded-md cursor-pointer px-2 py-1"
            (click)="clear()"
          >
            <i [class]="ICONS.CLOSE"></i> Cancelar
          </button>
          <button
            class="bg-primary text-white  rounded-md cursor-pointer px-2 py-1"
            (click)="firmarDocumento()"
          >
            <i [class]="ICONS.SEND"></i> Firmar
          </button>
        </div>
      </div>
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
  private TokenS = inject(TokenStateService);
  ValueToken: any = null;

  ngOnInit(): void {
    // this.ValueToken = this.TokenS.getStoredToken();
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

    const currentState = this.TokenS.getCurrentState();
    if (!currentState.slot || !currentState.pin || !currentState.alias) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe validar el token primero',
        life: 3000,
      });
      return;
    }
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.fileName.set(file.name);
      this.TokenS.setDocumentInfo(file.name, 'pdf');
      this.convertToBase64(file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentState = this.TokenS.getCurrentState();
    if (!currentState.slot || !currentState.pin || !currentState.alias) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe validar el token primero',
        life: 3000,
      });
      return;
    }
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName.set(file.name);
      this.TokenS.setDocumentInfo(file.name, 'pdf');
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
    const signingData = this.TokenS.getSigningData();
    if (!signingData) {
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
        slot: Number(signingData.slot!),
        alias: signingData.alias!,
        pin: signingData.pin!,
        nombre: signingData.documentName!,
        tipo_documento: signingData.documentType!,
        pdf: this.fileBase64,
      })
      .subscribe({
        next: (response) => {
          this.TokenS.setSignedDocument(response);
          console.log('respuesta del jacubitus', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Documento firmado correctamente',
            life: 3000,
          });
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
