import { Component, HostListener } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';

@Component({
  selector: 'upload-file',
  imports: [NgIf, CommonModule, ButtonPrimaryComponent],
  template: `
    <div
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full cursor-pointer p-6 transition-all duration-300 "
      [class.bg-gray-100]="isDragging"
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
      <p
        *ngIf="fileName"
        [ngClass]="{
          'animate-slide-up': fileName,
          'border-red-400': !isDragging
        }"
        class="bg-white ring-1 rounded-md absolute bottom-[10vh] p-4 text-sm text-primary flex justify-center items-center gap-2"
      >
        <i [class]="ICONS.VALIDATE"></i>
        {{ fileName }}

        <button-primary label="Firmar Documento" />
      </p>
    </div>
  `,
})
export class UploadFile {
  ICONS = ICONS;
  isDragging = false;
  fileName: string | null = null;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName = file.name;
      console.log('Archivo seleccionado:', file);
    }
  }
}
