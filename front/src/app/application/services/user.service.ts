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
  private URL_SEARCH_USER = 'http://localhost:3000' + API.SERVICE_EXTERNAL;
  private URL_REGISTER = 'http://localhost:3000' + API.REGISTER;

  infoUsre(CI: string): Observable<res<infoUser[]>> {
    return this.http.post<res<infoUser[]>>(
      this.URL_SEARCH_USER + '/' + CI,
      null
    );
  }
  register(data: RegisterPeyload): Observable<res<any>> {
    return this.http.post<res<any>>(this.URL_REGISTER, data);
  }
}
