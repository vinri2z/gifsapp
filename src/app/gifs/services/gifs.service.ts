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
  buscarGifs(query: string): void {
    query = query.trim().toLowerCase();

    // if query string is empty do not search
    if (!query) return;

    // if query string already in history do not search
    if (this._history.includes(query)) return;

    this._history.unshift(query);
    this._history = this._history.splice(0, 10);
  }
}
