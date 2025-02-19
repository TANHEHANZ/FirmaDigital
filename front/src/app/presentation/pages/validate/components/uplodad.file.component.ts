import { Component } from '@angular/core';
import { ICONS } from '../../../shared/ui/icons';
@Component({
  selector: 'upload-file',
  styles: `
  
    `,
  template: `
    <div
      class="rounded-xl border-2 border-gray-300 flex flex-col justify-center items-center col-span-2 relative w-full h-full "
    >
      <i
        [class]="ICONS.UPLOAD"
        class="bg-primary/20 text-primary p-4 rounded-full"
      ></i>
      <p class="text-xl font-medium">
        <span class="text-primary">Haga clic aquí </span>
        para cargar su archivo o arrástrelo
      </p>
    </div>
  `,
})
export class UploadFile {
  ICONS = ICONS;
}
