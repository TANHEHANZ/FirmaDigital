import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../models/api.enum';
import { res } from '../models/api.response';

@Injectable({
  providedIn: 'root',
})


export class ConectService {
  private URL = 'https://localhost:3000'+API.LOGIN;
  http = inject(HttpClient);
  login(): Observable<res> {
    return this.http.get<res>(this.URL);
  }

}
