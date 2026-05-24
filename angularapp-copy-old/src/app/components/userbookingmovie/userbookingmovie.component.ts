import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Booking } from 'src/app/models/booking.model';
import { Movie } from 'src/app/models/movie.model';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-userbookingmovie',
  templateUrl: './userbookingmovie.component.html',
  styleUrls: ['./userbookingmovie.component.css']
})
export class UserbookingmovieComponent implements OnInit {
  movieId: number;
  movie: Movie;
  selectedSeats: number = 1;
  maxSeats: number = 10;
  userId: number;
  totalCost: number = 0;
  errorMessage: string = '';
  

  seatGrid: boolean[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService,
    private userStorageService: UserStoreService
  ) { }

  ngOnInit(): void {
    this.movieId=+this.route.snapshot.paramMap.get('movieId');
    this.userId=this.userStorageService.authUser?.userId;
      if (this.movieId) {
        this.loadMovieDetails();
        this.initializeSeatGrid();
      }
    
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
        this.calculateTotalCost();
      },
      (error) => {
        this.errorMessage = 'Error loading movie details';
        console.error('Load movie error', error);
      }
    );
  }

  initializeSeatGrid(): void {
    this.seatGrid = Array.from({ length: 10 }, () => 
      Array.from({ length: 10 }, () => false)
    );
  }

  incrementSeats(): void {
    if (this.selectedSeats < this.maxSeats) {
      this.selectedSeats++;
      this.calculateTotalCost();
    }
  }

  decrementSeats(): void {
    if (this.selectedSeats > 1) {
      this.selectedSeats--;
      this.calculateTotalCost();
    }
  }

  calculateTotalCost(): void {
    if (this.movie) {
      this.totalCost = this.selectedSeats * this.movie.price;
    }
  }

  toggleSeat(row: number, col: number): void {
    const currentSelectedSeats = this.countSelectedSeats();
    
    if (!this.seatGrid[row][col] && currentSelectedSeats < this.selectedSeats) {
      this.seatGrid[row][col] = true;
    } else if (this.seatGrid[row][col]) {
      this.seatGrid[row][col] = false;
    }
  }

  countSelectedSeats(): number {
    return this.seatGrid.reduce((total, row) => 
      total + row.filter(seat => seat).length, 0);
  }

  createBooking(): void {
    const selectedSeatCount = this.countSelectedSeats();
    
    if (selectedSeatCount !== this.selectedSeats) {
      alert(`Please select exactly ${this.selectedSeats} seats`);
      return;
    }

    const booking: Booking = {
      userId: this.userId,
      movieId: this.movieId,
      seatCount: this.selectedSeats,
      totalCost: this.totalCost
    };

    // Call booking service to add booking
    this.bookingService.addBooking(this.movieId,this.userId,booking).subscribe(
      () => {
        alert('Booking Added Successfully!');
        this.router.navigate(['user/view/Movies']);
      },
      (error) => {
        this.errorMessage = 'Error creating booking';
        console.error('Booking error', error);
        alert('Failed to create booking');
      }
    );
  }

}
