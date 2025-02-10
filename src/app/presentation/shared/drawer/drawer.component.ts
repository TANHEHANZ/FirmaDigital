import { NgClass, NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { DrawerService } from '../../../application/global/drawer.service';

@Component({
  selector: 'app-drawer',
  imports: [NgClass, NgIf],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent {
  drawerService = inject(DrawerService);
  title = this.drawerService.title;
}
