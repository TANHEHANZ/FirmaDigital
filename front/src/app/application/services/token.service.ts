import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, API_ROUTES } from '../models/api.enum';
import { ResponseToken } from '../models/interfaces/api/token/response';
import { TokenPayload } from '../models/interfaces/api/token/peyload';
import { res } from '../models/api.response';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://localhost:9000';
  private readonly URL_SAVE = 'http://localhost:3000' + API.TOKEN;

  dataToken(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}${API_ROUTES.DATA_TOKEN}`, {
      slot: data.slot,
      pin: data.pin,
    });
  }
  getListToken(): Observable<any> {
    return this.http.get(`${this.API_URL}${API_ROUTES.LIST_TOKEN}`);
  }
  saveToken(data: TokenPayload): Observable<any> {
    return this.http.post<any>(this.URL_SAVE, data);
  }
  getAllToken(): Observable<res<ResponseToken>> {
    return this.http.get<res<ResponseToken>>(this.URL_SAVE);
  }
}
