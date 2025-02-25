import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../models/api.enum';
import { FirmarPdfRequest } from '../models/interfaces/firmar/pdf';
import { TokenDataRequest } from '../models/interfaces/validate.token';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly API_URL = 'https://localhost:9000';
  private readonly API_BAACK = 'http://localhost:3000';
  private http = inject(HttpClient);

  getStatusJacubitus(): Observable<any> {
    return this.http.get<any[]>(
      `${this.API_URL}${API_ROUTES.STATUS_JACUBITUS}`
    );
  }
  getListToken(): Observable<any> {
    return this.http.get(`${this.API_URL}${API_ROUTES.LIST_TOKEN}`);
  }

  dataToken(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}${API_ROUTES.DATA_TOKEN}`, {
      slot: data.slot,
      pin: data.pin,
    });
  }

  uploadFile(
    fileData: FirmarPdfRequest,
    id_historial?: string
  ): Observable<any> {
    const url = id_historial
      ? `${this.API_BAACK}/v1/api/jacubitus/firmar/${id_historial}`
      : `${this.API_BAACK}/v1/api/jacubitus/firmar`;

    return this.http.post(url, fileData);
  }
}
