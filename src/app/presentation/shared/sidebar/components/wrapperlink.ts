import { Component, inject, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { SidebarService } from '../../../../application/global/sidebar.service';

@Component({
  selector: 'app-wrapperlink',
  standalone: true,
  imports: [NgIf],
  template: `
    <section class="w-full flex flex-col items-start gap-2">
      <p class="text-xs font-medium text-gray-400 uppercase">
        <ng-container *ngIf="!collapsed; else collapsedTemplate">
          {{ title() }}
        </ng-container>
        <ng-template #collapsedTemplate>
          <div class="h-1 w-full bg-black"></div>
        </ng-template>
      </p>
      <ng-content></ng-content>
    </section>
  `,
})
export class WrapperlinkComponent {
  title = input<string>();
  service = inject(SidebarService);
  collapsed = this.service.isCollapsed();
}
