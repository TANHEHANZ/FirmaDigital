import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../utils/local-storage.service';
import { DRAWER_KEY } from '../constants/CONSTANTS';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private storage = inject(LocalStorageService);
  isCollapsed = signal<boolean>(false);
  title = signal<string>('');
  constructor() {
    if (typeof window !== 'undefined') {
      this.isCollapsed.set(this.storage.getItem<boolean>(DRAWER_KEY) || false);
    }
  }

  changeDrawer() {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this.storage.setItem(DRAWER_KEY, newState);
  }
  changeTitle(title: string) {
    this.title.set(title);
  }
  setSidebarState(state: boolean) {
    this.storage.setItem(DRAWER_KEY, state);
  }
}
