import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
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
  private readonly URL_ASIGNAR = 'http://localhost:3000' + API.ASIGNAR;
  private readonly URL_LIST = 'http://localhost:3000' + API.LIST_TOKEN;
  private refreshSubject = new Subject<boolean>();
  refresh$ = this.refreshSubject.asObservable();
  dataToken(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}${API_ROUTES.DATA_TOKEN}`, {
      slot: data.slot,
      pin: data.pin,
    });
  }
  getListToken(): Observable<any> {
    return this.http.get(this.URL_LIST);
  }
  saveToken(data: TokenPayload): Observable<any> {
    return this.http.post<any>(this.URL_SAVE, data);
  }
  getAllToken(params: {
    nombreTitular?: string;
    ciTitular?: string;
    entidadEmisora?: string;
    fechaExpiracion?: string;
    page?: number;
    limit?: number;
  }): Observable<res<ResponseToken>> {
    const queryParams = new URLSearchParams();

    if (params.nombreTitular)
      queryParams.append('nombreTitular', params.nombreTitular);
    if (params.ciTitular) queryParams.append('ciTitular', params.ciTitular);
    if (params.entidadEmisora)
      queryParams.append('entidadEmisora', params.entidadEmisora);
    if (params.fechaExpiracion)
      queryParams.append('fechaExpiracion', params.fechaExpiracion);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const url = `${this.URL_SAVE}?${queryParams.toString()}`;
    return this.http.get<res<ResponseToken>>(url);
  }

  refreshList() {
    this.refreshSubject.next(true);
  }
  asignarToken(data: any): Observable<res<any>> {
    return this.http.post<any>(`${this.URL_ASIGNAR}`, data);
  }
  unsubscribe(id: string, state: string): Observable<any> {
    return this.http
      .patch<any>(this.URL_SAVE + '/' + id, { state })
      .pipe(tap(() => this.refreshSubject.next(true)));
  }
}
