import { Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  isLogin = signal(true);

  constructor(private messageService: MessageService) {}

  toggleForm() {
    this.isLogin.set(!this.isLogin());
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
