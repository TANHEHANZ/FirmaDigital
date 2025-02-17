import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginInformacionComponent } from './components/information.component';
import { FormLoginComponent } from './components/form-login.component';
import { FormRegisterComponent } from './components/form-register.component';
import { NgStyle } from '@angular/common';
import { AuthStateService } from '../../../application/global/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, LoginInformacionComponent, ToastModule, RouterOutlet],
  providers: [MessageService],
  template: `
    <p-toast position="bottom-right"></p-toast>
    <main class="grid grid-cols-2 relative">
      <login-informacion />
      <section class="relative">
        <p
          class="font-medium bg-primary text-white absolute top-8 left-8 px-2 py-1 rounded-md"
        >
          Integrado con Jacubitus
        </p>
        <router-outlet />
      </section>
    </main>
  `,
})
export class LoginComponent {
  private authStateService = inject(AuthStateService);
  isLogin = this.authStateService.isLogin;
}
