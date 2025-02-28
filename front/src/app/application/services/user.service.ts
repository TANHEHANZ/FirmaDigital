import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../models/api.enum';
import { HttpClient } from '@angular/common/http';
import { res } from '../models/api.response';
import { infoUser } from '../models/interfaces/api/infoUser';
import { RegisterPeyload } from '../models/interfaces/api/login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private API_SERVER = 'http://localhost:3000';
  private URL_SEARCH_USER = this.API_SERVER + API.SERVICE_EXTERNAL;
  private URL_REGISTER = this.API_SERVER + API.REGISTER;
  private URL_ROL = this.API_SERVER + API.ROL;
  private URL_UNSUB = this.API_SERVER + API.UNSUB;

  infoUsre(CI: string): Observable<res<infoUser[]>> {
    return this.http.post<res<infoUser[]>>(
      this.URL_SEARCH_USER + '/' + CI,
      null
    );
  }
  getById(id: string): Observable<any> {
    return this.http.get<any>(this.URL_REGISTER + '/' + id);
  }
  register(data: RegisterPeyload): Observable<res<any>> {
    return this.http.post<res<any>>(this.URL_REGISTER, data);
  }
  getRolUser(): Observable<res<any>> {
    return this.http.get<res<any>>(this.URL_ROL);
  }
  getAllUser(): Observable<any> {
    return this.http.get<any>(this.URL_REGISTER);
  }

  unsubscribe(id: string, state: string): Observable<any> {
    return this.http.patch<any>(this.URL_REGISTER + '/' + id, {
      state,
    });
  }
}
