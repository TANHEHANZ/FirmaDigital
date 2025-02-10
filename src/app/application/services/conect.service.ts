import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenConnectedResponse } from '../models/interfaces/connected';

@Injectable({
  providedIn: 'root',
})
export class ConectService {
  private apiUrl = 'https://localhost:9000/api/token/connected';
  response: TokenConnectedResponse | null = null;
  http = inject(HttpClient);
  conectedToken(): Observable<TokenConnectedResponse> {
    return this.http.get<TokenConnectedResponse>(this.apiUrl);
  }
}
