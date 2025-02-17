import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  isLogin = signal(true);

  toggleForm() {
    this.isLogin.set(!this.isLogin());
  }
}
