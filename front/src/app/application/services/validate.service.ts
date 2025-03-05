import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  private apiUrl = 'http://192.168.220.119:3000/v1/api/jacubitus/validar';

  constructor(private http: HttpClient) {}

  validateDocument(base64File: string): Observable<any> {
    return this.http.post(this.apiUrl, { pdf: base64File });
  }
}
