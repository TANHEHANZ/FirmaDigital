import { Component, HostListener } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'upload-file',
  imports: [NgIf],
  template: `
    <div
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full cursor-pointer p-6 transition-all duration-300"
      [class.bg-gray-100]="isDragging"
      (click)="fileInput.click()"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave()"
      (drop)="onDrop($event)"
    >
      <i
        [class]="ICONS.UPLOAD"
        class="bg-primary/20 text-primary p-4 rounded-full"
      ></i>
      <p class="text-xl font-medium text-center">
        <span class="text-primary">Haga clic aquí </span>
        para cargar su archivo o arrástrelo
      </p>
      <input
        #fileInput
        type="file"
        class="hidden"
        (change)="onFileSelected($event)"
      />
    </div>
    <p *ngIf="fileName" class="mt-2 text-gray-600">
      Archivo seleccionado: {{ fileName }}
    </p>
  `,
  styles: [
    `
      .dragging {
        border-color: #2563eb; /* Cambia el color del borde cuando el archivo se arrastra */
      }
    `,
  ],
})
export class UploadFile {
  ICONS = ICONS;
  isDragging = false;
  fileName: string | null = null;

  // Evento cuando el usuario arrastra un archivo sobre el área
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // Evento cuando el usuario sale del área de arrastre
  onDragLeave() {
    this.isDragging = false;
  }

  // Evento cuando el usuario suelta un archivo en el área
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.fileName = file.name;
      console.log('Archivo arrastrado:', file);
      // Aquí podrías enviar el archivo a tu backend o procesarlo
    }
  }

  // Evento cuando el usuario selecciona un archivo desde el input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName = file.name;
      console.log('Archivo seleccionado:', file);
      // Aquí podrías enviar el archivo a tu backend o procesarlo
    }
  }
}
