import { inject, Injectable, model, signal } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';
import { NAV } from '../constants/constants';
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  storage = inject(LocalStorageService);
  isCollapsed = signal<boolean>(this.storage.getItem<boolean>(NAV) || false);
  changeValue() {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    localStorage.setItem(NAV, JSON.stringify(newState));
  }
  setSidebarState(state: boolean) {
    localStorage.setItem(NAV, JSON.stringify(state));
  }
}
