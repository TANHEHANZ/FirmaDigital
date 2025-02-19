import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet, SidebarComponent, NgClass, ToastModule],
  providers: [MessageService],
  template: `
    <main class="h-screen w-screen flex transition-all delay-100">
      <app-sidebar />
      <section class="w-full h-full ">
        <router-outlet />
      </section>
    </main>
  `,
})
export class PrivateComponent {
  readonly sidebarService = inject(SidebarService);
  isCollapsed = this.sidebarService.isCollapsed;
}
