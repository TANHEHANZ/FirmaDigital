import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent],
  template: `
    <main
      class="h-screen w-screen grid  grid-cols-[230px_1fr] grid-rows-[auto_1fr] "
    >
      <app-sidebar
        class=" h-full row-span-2 shadow-md border-r border-r-gray-300   "
      />
      <section class=" row-span-2 flex flex-col ">
        <app-topbar class="h-auto w-full z-50  p-1 shadow-md " />
        <router-outlet />
      </section>
    </main>
  `,
})
export class PrivateComponent {}
