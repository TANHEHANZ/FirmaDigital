import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../utils/local-storage.service';

interface TokenState {
  slot?: string;
  alias?: string;
  pin?: string;
  selectedToken?: any;
  isConnected?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TokenStateService {
  private localStorage = inject(LocalStorageService);
  private state = new BehaviorSubject<TokenState>({});

  constructor() {
    this.loadPersistedState();
  }

  private loadPersistedState() {
    const tokenData = this.localStorage.getItem('tokenData');
    const pin = sessionStorage.getItem('pin');

    if (tokenData) {
      this.state.next({
        ...tokenData,
        pin: pin ? pin : '',
        isConnected: true,
      });
    }
  }

  updateState(newState: Partial<TokenState>) {
    const currentState = this.state.value;
    console.log(newState);
    const updatedState = { ...currentState, ...newState };

    this.state.next(updatedState);
    const storageData = {
      slot: updatedState.slot,
      alias: updatedState.alias,
      selectedToken: updatedState.selectedToken,
      isConnected: updatedState.isConnected,
    };
    this.localStorage.setItem('tokenData', storageData);

    if (updatedState.pin) {
      sessionStorage.setItem('pin', updatedState.pin);
    }
  }

  getState() {
    return this.state.asObservable();
  }

  clearState() {
    this.state.next({});
    this.localStorage.removeItem('tokenData');
    sessionStorage.removeItem('pin');
  }
  getStoredToken(): Partial<TokenState> | null {
    const { slot, alias } = this.localStorage.getItem(
      'tokenData'
    ) as TokenState;
    const pin = sessionStorage.getItem('pin');

    if (slot && alias && pin) {
      return {
        slot,
        alias,
        pin: pin || '',
      };
    }
    return null;
  }
}
