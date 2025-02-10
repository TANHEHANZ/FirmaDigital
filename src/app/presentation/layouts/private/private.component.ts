import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { SidebarService } from '../../../application/global/sidebar.service';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DrawerComponent } from '../../shared/drawer/drawer.component';

@Component({
  selector: 'app-private',
  imports: [
    RouterOutlet,
    SidebarComponent,
    NgClass,
    ToastModule,
    DrawerComponent,
  ],
  providers: [MessageService],
  template: `
    <main
      [ngClass]="{
        ' grid-cols-[280px_1fr]': isCollapsed(),
        ' grid-cols-[100px_1fr]': !isCollapsed()
      }"
      class="h-screen w-screen grid  grid-cols-[280px_1fr] grid-rows-[auto_1fr] transition-all delay-100"
    >
      <app-sidebar class=" h-full row-span-2 " />
      <section class=" row-span-2 flex flex-col ">
        <p-toast></p-toast>
        <app-drawer></app-drawer>
        <router-outlet />
      </section>
    </main>
  `,
})
export class PrivateComponent {
  readonly sidebarService = inject(SidebarService);
  isCollapsed = this.sidebarService.isCollapsed;
}
