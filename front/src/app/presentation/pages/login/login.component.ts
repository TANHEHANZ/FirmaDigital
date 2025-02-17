import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LoginInformacionComponent } from './components/information.component';
import { FormLoginComponent } from './components/form-login.component';
import { FormRegisterComponent } from './components/form-register.component';
import { NgStyle } from '@angular/common';
import { AuthStateService } from '../../../application/global/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    LoginInformacionComponent,
    FormLoginComponent,
    FormRegisterComponent,
    NgStyle,
  ],
  providers: [MessageService],
  template: `
    <section class="w-screen h-screen grid grid-cols-2 bg-white">
      <login-informacion />

      <div class="relative w-full h-full overflow-hidden  ">
        <div
          class="flex h-full transition-transform duration-300 ease-in-out "
          [ngStyle]="{
            transform: isLogin ? 'translateX(0%) ' : 'translateX(-100%) '
          }"
        >
          <form-login class="w-full  " />
          <form-register class="w-full  " />
        </div>
      </div>
    </section>
  `,
})
export class LoginComponent {
  private authStateService = inject(AuthStateService);
  isLogin = this.authStateService.isLogin();
}
