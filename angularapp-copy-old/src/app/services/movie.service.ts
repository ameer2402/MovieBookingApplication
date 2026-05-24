import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = "http://localhost:8080/api/movie";

  constructor(private http:HttpClient) { }

  addMovie(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl,movie);
  }
  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl);
  }
  getMovieById(movieId:number):Observable<Movie>{
    return this.http.get<Movie>(this.apiUrl+"/"+movieId);
  }
  deleteMovie(movieId:number):Observable<Movie>{
    return this.http.delete<Movie>(this.apiUrl+"/"+movieId);
  }
  updateMovie(movieId:number,movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(this.apiUrl+"/"+movieId,movie);
  }


}
