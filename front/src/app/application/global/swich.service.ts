import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwichService {
  $modal = new EventEmitter<string | null>();
}
