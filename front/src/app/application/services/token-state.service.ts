import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface TokenState {
  slot?: string;
  alias?: string;
  pin?: string;
  documentName?: string;
  documentType?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenStateService {
  private state = new BehaviorSubject<TokenState>({});

  updateState(newState: Partial<TokenState>) {
    const currentState = this.state.value;
    const updatedState = { ...currentState, ...newState };
    this.state.next(updatedState);
  }

  getState() {
    return this.state.asObservable();
  }

  getCurrentState(): TokenState {
    return this.state.value;
  }

  setDocumentInfo(name: string, type: string = 'pdf') {
    this.updateState({
      documentName: name,
      documentType: type,
    });
  }

  clearState() {
    this.state.next({});
  }

  getSigningData(): Partial<TokenState> | null {
    const currentState = this.state.value;

    if (currentState.slot && currentState.alias && currentState.pin) {
      return {
        slot: currentState.slot,
        alias: currentState.alias,
        pin: currentState.pin,
        documentName: currentState.documentName,
        documentType: currentState.documentType,
      };
    }
    return null;
  }
}
