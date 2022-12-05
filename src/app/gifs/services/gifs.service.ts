import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[];
  private apiKey = 'HZpuFyT5F8noQ0JAkLuYO8LwcaNIRjwB';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';

  public results: Gif[];

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get history() {
    return [...this._history];
  }
  buscarGifs(query: string = ''): void {
    query = query.trim().toLowerCase();

    // if query string is empty do not search
    if (!query) return;

    // if query string already in history do not search
    if (!this._history.includes(query)) this._history.unshift(query);

    this._history = this._history.splice(0, 10);
    localStorage.setItem('history', JSON.stringify(this._history));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}/search`, {
        params,
      })
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(resp.data));
      });
  }
}
