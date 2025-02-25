import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ICONS } from '../../shared/ui/icons';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './validate.component.html',
})
export class ValidateComponent {
  ICONS = ICONS;
  fileName = signal<string>('');

  isDragging = false;
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
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
  }
  validarDocumento() {}
}
