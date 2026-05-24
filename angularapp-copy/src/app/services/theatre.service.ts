import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theatre } from '../models/theatre.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {
  private apiUrl = `${environment.apiUrl}/theatres`;

  constructor(private http: HttpClient) { }

  getAllTheatres(): Observable<Theatre[]> {
    return this.http.get<Theatre[]>(this.apiUrl);
  }

  getTheatreById(id: string): Observable<Theatre> {
    return this.http.get<Theatre>(`${this.apiUrl}/${id}`);
  }

  addTheatre(theatre: Theatre): Observable<Theatre> {
    return this.http.post<Theatre>(this.apiUrl, theatre);
  }

  deleteTheatre(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
