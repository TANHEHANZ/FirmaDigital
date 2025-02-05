import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  isCollapsed = signal<boolean>(false);
  changeValue() {
    console.log('manejo' + this.isCollapsed());

    this.isCollapsed.set(!this.isCollapsed());
  }
  setSidebarState(state: boolean) {
    this.isCollapsed.set(state);
  }
}
