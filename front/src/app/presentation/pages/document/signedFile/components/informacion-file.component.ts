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
  imports: [CommonModule, CardComponenr, CalendarModule, FormsModule],
  template: `
    <section class="p-4">
      <h2 class="text-xl mb-4">Historial del documento</h2>

      <div class="">
        <section class="grid grid-cols-2 gap-4">
          <h3 class="font-medium col-span-2 mb-4">Información del documento</h3>
          <app-card title="Nombre del documento">
            <p class="text-sm">
              {{ infoHistory?.principal?.Documento?.nombre }}
            </p>
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
                'border-signed text-signed':
                  infoHistory?.principal?.Documento?.estado === 'ACTIVO',
                'border-error text-error':
                  infoHistory?.principal?.Documento?.estado === 'ELIMINADO',
                'border-processing text-processing':
                  infoHistory?.principal?.Documento?.estado === 'EDITADO',
                'border-gray-400':
                  infoHistory?.principal?.Documento?.estado === 'DESHABILITADO'
              }"
            >
              {{
                infoHistory?.principal?.Documento?.estado === 'ACTIVO'
                  ? 'FIRMADO'
                  : infoHistory?.principal?.Documento?.estado
              }}
            </p>
          </app-card>
          <h3 class="font-medium col-span-2 ">Información del firmante</h3>
          <app-card title="Nombre">
            <p class="text-sm">{{ infoHistory?.principal?.User?.name }}</p>
          </app-card>

          <app-card title="CI">
            <p class="text-sm">{{ infoHistory?.principal?.User?.ci }}</p>
          </app-card>
          <h3 class="font-medium col-span-2 ">Token Asignado</h3>
          @for(asig of infoHistory?.principal?.User?.AsignacionToken; track
          $index){
          <app-card title="fecha_asignacion">
            <p-calendar
              [(ngModel)]="documentCreationDate"
              [showIcon]="true"
              [showTime]="true"
              disabled="true"
              dateFormat="dd/mm/yy"
            ></p-calendar>
          </app-card>
          <app-card title="Cantidad de certificados">
            <p class="text-sm">
              {{ asig.token.cantidad_certificados }}
            </p>
          </app-card>
          <app-card title="Estado token">
            <p class="text-sm">
              {{ asig.token.estado_token }}
            </p>
          </app-card>
          <h3 class="font-medium col-span-2 ">Titular del token</h3>

          <app-card title="Titular">
            <p class="text-sm">
              {{ asig.token.Certificado?.titular?.nombre }}
            </p>
          </app-card>
          <app-card title="CI Titular">
            <p class="text-sm">
              {{ asig.token.Certificado?.titular?.ci }}
            </p>
          </app-card>

          <app-card title="Emisor">
            <p class="text-sm">
              {{ asig.token.Certificado?.Emisor?.entidad }}
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
          } @empty {
          <p class="text-sm">No se encontraron registros</p>
          }
        </section>
        <!-- @for (item of infoHistory?.data?.principal; track $index) { -->
        <!-- 
          
          @for(items of item.User?.Asig.tokennacionToken; track $index){


          <button-primary
            class="col-span-2 mt-4"
            (clicked)="descargar(item.Documento?.id)"
            label="Descargar Documento"
            [icon]="ICONS.DOWNLOAD"
          ></button-primary>
        </section> -->
        <!-- } -->
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
      console.log(data);
      if (data && data.idDocumento) {
        this.historyS.signedHistory(data.idDocumento).subscribe({
          next: (res: any) => {
            this.infoHistory = res.data;
            console.log('Informacion', this.infoHistory);
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
