import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../models/api.enum';
import { res } from '../models/api.response';
import { loginPeyload, RegisterPeyload } from '../models/interfaces/api/login';

export interface res_data {
  accessToken: string;
  refreshToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private URL_LOGIN = 'http://localhost:3000' + API.LOGIN;
  private URL_REGISTER = 'http://localhost:3000' + API.REGISTER;

  http = inject(HttpClient);
  login(data: loginPeyload): Observable<res<any>> {
    return this.http.post<res<any>>(this.URL_LOGIN, data);
  }

  register(data: RegisterPeyload): Observable<res<any>> {
    return this.http.post<res<any>>(this.URL_REGISTER, data);
  }
}
