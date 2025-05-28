import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrls: ['./adminaddmovie.component.css']
})
export class AdminaddmovieComponent implements OnInit {
  movie: Movie = { id: 0, title: '', duration: 0, genre: '', price: 0, totalSeats: 0 };
  isEditing: boolean = false;
  errorMessage: string = '';
  movieId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params['id'];
    })
    if (this.movieId) {
      console.log(this.movieId);
      this.isEditing = true;
      this.loadMovie(this.movieId);
    }


  }
  loadMovie(id: number): void {
    this.movieService.getMovieById(id).subscribe(
      (data) => (this.movie = data),
      (error) => (this.errorMessage = 'Error loading movie')
    );
  }
  addOrUpdateMovie(): void {
    if (this.isEditing) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
        () => this.closeModal(),
        (error) => (this.errorMessage = 'Error updating movie')
      );
    }
    else {
      this.movieService.addMovie(this.movie).subscribe(
        () => this.closeModal(),
        (error) => (this.errorMessage = 'Error adding movie')

      )

    }

  }

  closeModal(): void {
    alert(this.isEditing ? "Movie updated Successfullu" : "Movie Added Successfully");
    this.router.navigate(['admin/view/Movies'])
  }
  cancelOperation(): void {
    this.router.navigate(['admin/view/Movies'])

  }



}
