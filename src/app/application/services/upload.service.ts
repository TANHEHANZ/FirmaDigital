import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../models/api.enum';
import { peyload_pdf } from '../models/signPdf';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly API_URL = 'https://localhost:9000';
  private http = inject(HttpClient);

  getStatusJacubitus(): Observable<any> {
    return this.http.get<any[]>(
      `${this.API_URL}${API_ROUTES.STATUS_JACUBITUS}`
    );
  }
  getListToken(): Observable<any> {
    return this.http.get(`${this.API_URL}${API_ROUTES.LIST_TOKEN}`);
  }

  dataToken(token: string): Observable<any> {
    return this.http.post(`${this.API_URL}${API_ROUTES.DATA_TOKEN}`, {
      token,
    });
  }

  uploadFile(fileData: peyload_pdf): Observable<any> {
    return this.http.post(
      `${this.API_URL}${API_ROUTES.UPLOAD_FILE_PDF}`,
      fileData
    );
  }
}
