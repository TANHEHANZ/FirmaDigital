import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-verify',
  imports: [NgFor],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  datos = [
    {
      nombre: 'LUIS FERNANDO ARGANDOÑA ESPADA',
      fechaHora: '2024-12-03T14:17:47.000-04:00',
      tipoDocumento: 'X509_CERTIFICATE',
      id_token: '6567867533',
      ip_equipo: '192.168.1.1',
      entidad: 'Entidad Certificadora Publica ADSIB',
    },
    {
      nombre: 'JUAN PÉREZ',
      fechaHora: '2024-10-01T10:30:00.000-04:00',
      tipoDocumento: 'PRIMARY_KEY',
      id_token: '1234567890',
      ip_equipo: '192.168.1.2',
      entidad: 'ADSIB',
    },
  ];
}
