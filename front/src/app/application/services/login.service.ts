import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API } from '../models/api.enum';
import { res } from '../models/api.response';
import { loginPeyload, RegisterPeyload } from '../models/interfaces/api/login';
import { LocalStorageService } from '../utils/local-storage.service';
import { ACCESS_TOKEN, REFRESH__TOKEN } from '../constants/CONSTANTS';

export interface res_data {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_LOGIN = 'http://localhost:3000' + API.LOGIN;
  private URL_REGISTER = 'http://localhost:3000' + API.REGISTER;
  private URL_REFRESH = 'http://localhost:3000' + API.REFRESH__TOKEN;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(data: loginPeyload): Observable<res<res_data>> {
    return this.http.post<res<res_data>>(this.URL_LOGIN, data).pipe(
      tap((response) => {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        this.setAccessToken(data.accessToken);
        this.setRefreshToken(data.refreshToken);
      })
    );
  }

  register(data: RegisterPeyload): Observable<res<any>> {
    return this.http.post<res<any>>(this.URL_REGISTER, data);
  }
  refreshToken(refreshToken: string): Observable<res<res_data>> {
    return this.http
      .post<res<res_data>>(this.URL_REFRESH, { refreshToken })
      .pipe(
        tap((response) => {
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          this.setAccessToken(data.accessToken);
        })
      );
  }

  getAccessToken(): string {
    return this.localStorage.getItem(ACCESS_TOKEN) || '';
  }

  setAccessToken(accessToken: string): void {
    this.localStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  getRefreshToken(): string {
    return this.localStorage.getItem(REFRESH__TOKEN) || '';
  }

  setRefreshToken(refreshToken: string): void {
    this.localStorage.setItem(REFRESH__TOKEN, refreshToken);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token; // Retorna `true` si hay un token válido
  }

  logout(): void {
    this.localStorage.clear();
  }
}
