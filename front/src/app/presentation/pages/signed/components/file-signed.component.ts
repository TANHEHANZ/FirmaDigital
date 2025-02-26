import { Component, inject, input, signal } from '@angular/core';
import {
  SignedDocumentResponse,
  TokenStateService,
} from '../../../../application/services/token-state.service';
import { CommonModule } from '@angular/common';
import CardComponenr from '../../../shared/ui/card..component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ICONS } from '../../../shared/ui/icons';
@Component({
  selector: 'file-signed',
  imports: [CommonModule, CardComponenr, CalendarModule, FormsModule],
  template: `
    <section
      class=" rounded-xl  p-8 flex flex-col gap-4 border-2 border-gray-300 relative overflow-auto w-[450px] h-full items-start "
    >
      <p
        class="text-xs font-light rounded-md px-3 py-1 bg-primary  top-2 left-2 text-white "
      >
        <i [class]="ICONS.INFO" class="mx-2"></i>
        {{
          signedDocument()?.Documento?.id_historial
            ? 'Documento con historial'
            : 'Documento único'
        }}
      </p>
      <h3 class=" text-xl ">Informacion del documento firmado</h3>
      <app-card title="Nombre" class=" w-full">
        <div class="flex justify-between  items-center w-full">
          {{ signedDocument()?.Documento?.nombre ?? '' }}
          <p class="p-2 bg-primary/50 text-white rounded-md text-sm ">
            {{ signedDocument()?.Documento?.tipo_documento }}
          </p>
        </div>
      </app-card>

      <app-card title="Fecha creacion documento ">
        <p-calendar
          class="max-w-full"
          [(ngModel)]="documentDate"
          [showWeek]="true"
          [showIcon]="true"
          disabled="true"
        ></p-calendar>
      </app-card>

      <app-card title="Estado">
        <p
          class="text-sm border rounded-xl text-center px-4  "
          [ngClass]="{
             'border  border-gray-400':
             signedDocument()?.Documento?.estado,
            'border-primary text-primary':
              signedDocument()?.Documento?.estado === 'ACTIVO',
            'border-error text-error':
              signedDocument()?.Documento?.estado === 'ELIMINADO',
            'border-processing text-processing':
              signedDocument()?.Documento?.estado === 'EDITADO',
            'border-gray-400 text-graborder-gray-400':
              signedDocument()?.Documento?.estado === 'DESHABILITADO',
           
          }"
        >
          {{
            signedDocument()?.Documento?.estado === 'ACTIVO'
              ? 'FIRMADO'
              : signedDocument()?.Documento?.estado
          }}
        </p>
      </app-card>

      <h4 class="text-xl ">Informacion del usuario firmador</h4>
      <app-card title="Nombre">
        <div class="flex justify-between  items-center w-full">
          {{ signedDocument()?.User?.name ?? '' }}
        </div>
      </app-card>
      <app-card title="Cargo">
        <div class="flex justify-between  items-center w-full">
          {{ signedDocument()?.User?.cargo ?? '' }}
        </div>
      </app-card>
      <app-card title="Ci">
        <div class="flex justify-between  items-center w-full">
          {{ signedDocument()?.User?.ci ?? '' }}
        </div>
      </app-card>
      <app-card title="Institucion">
        <div class="flex justify-between  items-center w-full">
          {{ signedDocument()?.User?.institucion ?? '' }}
        </div>
      </app-card>
    </section>
  `,
})
export class FileSigned {
  private tokenState = inject(TokenStateService);
  signedDocument = signal<SignedDocumentResponse | null>(null);
  documentDate = signal<Date | null>(null);
  ICONS = ICONS;
  ngOnInit() {
    this.tokenState.getSignedDocument().subscribe((doc) => {
      this.signedDocument.set(doc);
      if (doc?.Documento?.fecha_creacion) {
        this.documentDate.set(new Date(doc.Documento.fecha_creacion));
      }
    });
  }
}
