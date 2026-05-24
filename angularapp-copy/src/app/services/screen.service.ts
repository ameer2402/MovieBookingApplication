import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScreenConfig } from '../models/screen.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private apiUrl = `${environment.apiUrl}/screens`;

  constructor(private http: HttpClient) { }

  getAllScreens(): Observable<ScreenConfig[]> {
    return this.http.get<ScreenConfig[]>(this.apiUrl);
  }

  getScreensByTheatreId(theatreId: string): Observable<ScreenConfig[]> {
    return this.http.get<ScreenConfig[]>(`${this.apiUrl}/theatre/${theatreId}`);
  }

  getScreenById(id: string): Observable<ScreenConfig> {
    return this.http.get<ScreenConfig>(`${this.apiUrl}/${id}`);
  }

  addScreen(screen: ScreenConfig): Observable<ScreenConfig> {
    return this.http.post<ScreenConfig>(this.apiUrl, screen);
  }

  deleteScreen(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
