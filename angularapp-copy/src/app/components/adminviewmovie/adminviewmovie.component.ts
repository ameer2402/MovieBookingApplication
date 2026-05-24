import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-adminviewmovie',
  templateUrl: './adminviewmovie.component.html',
  styleUrls: ['./adminviewmovie.component.css']
})
export class AdminviewmovieComponent implements OnInit {
  movies: Movie[] = [];
  errorMessage: string = '';
  
  searchTerm: string = '';
  statusFilter: string = 'All';
  isSearchFocused: boolean = false;
  isFilterFocused: boolean = false;
  isCustomFilterOpen: boolean = false;

  toggleCustomFilter(): void {
    this.isCustomFilterOpen = !this.isCustomFilterOpen;
  }

  selectStatus(status: string): void {
    this.statusFilter = status;
    this.isCustomFilterOpen = false;
  }

  constructor(
    private movieService: MovieService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (data) => {
        this.movies = data.reverse();
      },
      (error) => {
        this.errorMessage = 'Error loading movies';
        console.error('Load movies error', error);
      }
    );
  }

  getMovieStatus(movie: any): string {
    if (!movie.showDate) return 'Unknown';
    
    const movieDate = new Date(movie.showDate);
    if (movie.showTime) {
      const [hours, minutes] = movie.showTime.split(':');
      movieDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      movieDate.setHours(23, 59, 59, 999);
    }
    
    const now = new Date();
    
    // Check if it's today
    if (movieDate.toDateString() === now.toDateString()) {
      return 'Now Showing';
    } else if (movieDate > now) {
      return 'Upcoming';
    } else {
      return 'Ended';
    }
  }

  get filteredMovies(): any[] {
    return this.movies.filter(movie => {
      const m: any = movie;
      
      // Exclude Ended movies entirely from Manage Movies
      if (this.getMovieStatus(m) === 'Ended') return false;

      const matchesSearch = !this.searchTerm || 
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        m.genre.toLowerCase().includes(this.searchTerm.toLowerCase());
        
      if (!matchesSearch) return false;
      
      if (this.statusFilter === 'All') return true;
      return this.getMovieStatus(m) === this.statusFilter;
    });
  }

  get totalActiveMovies(): number {
    return this.movies.length;
  }

  get totalCapacity(): number {
    return this.movies.reduce((sum, movie) => sum + (movie.totalSeats || 0), 0);
  }

  get upcomingPremieres(): number {
    return this.movies.filter(movie => this.getMovieStatus(movie) === 'Upcoming').length;
  }

  deleteMovie(movieId: number): void {
    if(confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(movieId).subscribe({
        next: () => {
          this.toastService.showSuccess('Movie Deleted', 'The movie has been permanently removed from the catalog.');
          this.loadMovies();
        },
        error: (error) => {
          console.error('Error deleting movie', error);
          this.toastService.showError('Deletion Failed', 'An error occurred while deleting the movie.');
        }
      });
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
