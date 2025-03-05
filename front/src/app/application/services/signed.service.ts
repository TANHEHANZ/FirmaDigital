import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../models/api.enum';
import { map, Observable } from 'rxjs';
import { res } from '../models/api.response';
import { responceSigned } from '../models/interfaces/api/signed';

@Injectable({
  providedIn: 'root',
})
export class SignedService {
  private http = inject(HttpClient);
  private URL_ADDRESS = 'http://localhost:3000';
  private URL_DOCUMENTS_SIGNED = this.URL_ADDRESS + API.SIGNED;
  private URL_SIGNED_HISTORY = this.URL_ADDRESS + API.SIGNED_HISTORY;
  private URL_SIGNED_FILE_BY_ID = this.URL_ADDRESS + API.SIGNED_FILE_BY_ID;

  docuemntsSigned(): Observable<res<responceSigned>> {
    return this.http.get<res<responceSigned>>(this.URL_DOCUMENTS_SIGNED);
  }
  signedHistory(id: string) {
    return this.http.get(this.URL_SIGNED_HISTORY + id);
  }

  getPdfBlobUrl(id: string): Observable<string> {
    return this.http.get<any>(this.URL_SIGNED_FILE_BY_ID + id).pipe(
      map((response) => {
        const binaryString = window.atob(response.data.documento_blob);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      })
    );
  }
}
