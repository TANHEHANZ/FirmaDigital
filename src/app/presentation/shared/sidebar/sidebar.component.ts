import { Component } from '@angular/core';
import { LinkComponent } from '../ui/link/link.component';
import { PATH_ROUTES } from '../../../application/models/route.enum';

@Component({
  selector: 'app-sidebar',
  imports: [LinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  PATH_ROUTES = PATH_ROUTES;
}
