import { Component, HostListener, signal } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonPrimaryComponent } from '../../../shared/ui/button/primary.component';

@Component({
  selector: 'upload-file',
  imports: [NgIf, CommonModule, ButtonPrimaryComponent],
  template: `
    <section
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full"
    >
      <div
        class=" flex justify-center items-center cursor-pointer p-6 transition-all duration-300 flex-col "
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

        <button-primary label="Firmar Documento" />
      </p>
    </section>
  `,
})
export class UploadFile {
  ICONS = ICONS;
  isDragging = false;
  fileName = signal<string>('');

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
      console.log('Archivo arrastrado:', file);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.fileName.set(file.name);
      console.log('Archivo seleccionado:', file);
    }
  }
}
