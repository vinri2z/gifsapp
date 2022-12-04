import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];
  constructor() {}
  get history() {
    return [...this._history];
  }
  buscarGifs(query: string) {
    this._history.unshift(query);
    this._history = this._history.slice(0, 10);
  }
}
