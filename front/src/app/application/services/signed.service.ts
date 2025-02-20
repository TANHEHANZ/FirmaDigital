import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../models/api.enum';
import { Observable } from 'rxjs';
import { res } from '../models/api.response';
import { responceSigned } from '../models/interfaces/api/signed';

@Injectable({
  providedIn: 'root',
})
export class SignedService {
  private http = inject(HttpClient);
  private URL_DOCUMENTS_SIGNED = 'http://localhost:3000' + API.SIGNED;

  docuemntsSigned(): Observable<res<responceSigned[]>> {
    return this.http.get<res<responceSigned[]>>(this.URL_DOCUMENTS_SIGNED);
  }
}
