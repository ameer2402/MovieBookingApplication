import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-adminviewmovie',
  templateUrl: './adminviewmovie.component.html',
  styleUrls: ['./adminviewmovie.component.css']
})
export class AdminviewmovieComponent implements OnInit {
  movies: Movie[] = [];
  errorMessage: string = '';
  
  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (data) => (this.movies = data),
      (error) => (this.errorMessage = 'Error loading movies')
    );
  }

  deleteMovie(movieId: number): void {
    if(confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movieId).subscribe(
        () => {
          this.movies = this.movies.filter(movie => movie.id !== movieId);
          alert('Movie deleted successfully');
        },
        (error) => {
          this.errorMessage = 'Error deleting movie';
          console.error('Delete movie error', error);
        }
      );
    }
  }

  updateMovie(movie: Movie): void {
    if(movie.id && !isNaN(movie.id)){
      this.router.navigate(['admin/add/newMovies'],{queryParams:{id:Number(movie.id)}});

    }
    else{
      this.errorMessage="Invalid Movie Id";
      console.log('Invalid movie Id',movie);
    }
  }

  addNewMovie(): void {
    this.router.navigate(['admin/add/newMovies']);
  }
}
