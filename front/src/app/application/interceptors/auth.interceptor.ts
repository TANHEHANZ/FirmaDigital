import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/login.service';

@Injectable()
export class AuthInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.authService.getAccessToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService
            .refreshToken(this.authService.getRefreshToken())
            .pipe(
              switchMap((res) => {
                this.authService.setAccessToken(res.data.accessToken);
                const newAuthReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.data.accessToken}`,
                  },
                });
                return next.handle(newAuthReq);
              }),
              catchError((refreshError) => {
                this.authService.logout();
                return throwError(() => refreshError);
              })
            );
        }
        return throwError(() => error);
      })
    );
  }
}
