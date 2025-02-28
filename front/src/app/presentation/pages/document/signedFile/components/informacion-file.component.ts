import {
  Component,
  inject,
  PLATFORM_ID,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { DrawerService } from '../../../../../application/global/drawer.service';
import { SignedService } from '../../../../../application/services/signed.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ButtonPrimaryComponent } from '../../../../shared/ui/button/primary.component';
import { ICONS } from '../../../../shared/ui/icons';
import CardComponenr from '../../../../shared/ui/card..component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'informationFile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonPrimaryComponent,
    CardComponenr,
    CalendarModule,
    FormsModule,
  ],
  template: `
    <section class="p-4">
      <h2 class="text-xl mb-4">Historial del documento</h2>

      <div class="">
        @for (item of infoHistory?.principal; track $index) {
        <section class="grid grid-cols-2 gap-4">
          <h3 class="font-medium col-span-2 mb-4">Información del documento</h3>

          <!-- Document Info -->
          <app-card title="Nombre del documento">
            <p class="text-sm">{{ item.Documento?.nombre }}</p>
          </app-card>

          <app-card title="Tipo de documento">
            <p class="text-sm">{{ item.Documento?.tipo_documento }}</p>
          </app-card>

          <app-card title="Fecha de creación">
            <p-calendar
              [(ngModel)]="documentCreationDate"
              [showIcon]="true"
              [showTime]="true"
              disabled="true"
              dateFormat="dd/mm/yy"
            ></p-calendar>
          </app-card>

          <app-card title="Estado del documento">
            <p
              class="text-sm border rounded-xl text-center px-4"
              [ngClass]="{
                'border-primary text-primary':
                  item.Documento?.estado === 'ACTIVO',
                'border-error text-error':
                  item.Documento?.estado === 'ELIMINADO',
                'border-processing text-processing':
                  item.Documento?.estado === 'EDITADO',
                'border-gray-400': item.Documento?.estado === 'DESHABILITADO'
              }"
            >
              {{
                item.Documento?.estado === 'ACTIVO'
                  ? 'FIRMADO'
                  : item.Documento?.estado
              }}
            </p>
          </app-card>
          <h3 class="font-medium col-span-2 ">Información del firmante</h3>

          <app-card title="Nombre">
            <p class="text-sm">{{ item.User?.name }}</p>
          </app-card>

          <app-card title="CI">
            <p class="text-sm">{{ item.User?.ci }}</p>
          </app-card>

          <!-- Certificate Info -->
          @if (item.User?.AsignacionToken?.[0]?.token?.Certificado) {
          <h3 class="font-medium col-span-2 ">Información del certificado</h3>

          <app-card title="Titular">
            <p class="text-sm">
              {{
                item.User?.AsignacionToken[0]?.token?.Certificado?.titular
                  ?.nombre
              }}
            </p>
          </app-card>

          <app-card title="CI Titular">
            <p class="text-sm">
              {{
                item.User?.AsignacionToken[0]?.token?.Certificado?.titular?.ci
              }}
            </p>
          </app-card>

          <app-card title="Emisor">
            <p class="text-sm">
              {{
                item.User?.AsignacionToken[0]?.token?.Certificado?.Emisor
                  ?.entidad
              }}
            </p>
          </app-card>

          <app-card title="Vigencia">
            <div class="flex gap-2 items-center">
              <p-calendar
                [(ngModel)]="certificateStartDate"
                [showIcon]="true"
                disabled="true"
                dateFormat="dd/mm/yy"
              ></p-calendar>
              <span>hasta</span>
              <p-calendar
                [(ngModel)]="certificateEndDate"
                [showIcon]="true"
                disabled="true"
                dateFormat="dd/mm/yy"
              ></p-calendar>
            </div>
          </app-card>
          }

          <button-primary
            class="col-span-2 mt-4"
            (clicked)="descargar(item.Documento?.id)"
            label="Descargar Documento"
            [icon]="ICONS.DOWNLOAD"
          ></button-primary>
        </section>
        }
      </div>
    </section>
  `,
})
export default class InformationFile implements OnInit {
  drawerService = inject(DrawerService);
  historyS = inject(SignedService);
  ICONS = ICONS;
  sanitizer = inject(DomSanitizer);
  documentDate = signal<Date | null>(null);
  infoHistory: any;
  documentCreationDate = signal<Date | null>(null);
  certificateStartDate = signal<Date | null>(null);
  certificateEndDate = signal<Date | null>(null);

  ngOnInit() {
    this.drawerService.getData().subscribe((data) => {
      if (data && data.Documento.id) {
        this.historyS.signedHistory(data.Documento.id).subscribe({
          next: (res: any) => {
            this.infoHistory = res.data;

            if (this.infoHistory?.principal[0]) {
              const doc = this.infoHistory.principal[0];
              if (doc.Documento?.fecha_creacion) {
                this.documentCreationDate.set(
                  new Date(doc.Documento.fecha_creacion)
                );
              }

              // Set certificate dates if available
              const cert = doc.User?.AsignacionToken?.[0]?.token?.Certificado;
              if (cert) {
                this.certificateStartDate.set(new Date(cert.desde));
                this.certificateEndDate.set(new Date(cert.hasta));
              }
            }
          },
          error: (err) => {
            console.error('Error fetching document data:', err);
          },
        });
      }
    });
  }

  descargar(documentId: string) {
    if (documentId) {
      this.historyS.getPdfBlobUrl(documentId).subscribe({
        next: (url: string) => {
          const link = document.createElement('a');
          link.href = url;
          link.download =
            this.infoHistory?.principal[0]?.Documento?.nombre ||
            'documento.pdf';
          link.click();
          URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Error downloading document:', err);
        },
      });
    }
  }
}
