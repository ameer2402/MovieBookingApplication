import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Booking } from 'src/app/models/booking.model';
import { Movie } from 'src/app/models/movie.model';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';
import { ScreenService } from 'src/app/services/screen.service';
import { ToastService } from 'src/app/services/toast.service';

export interface Seat {
  id: string;
  isOccupied: boolean;
}

@Component({
  selector: 'app-userbookingmovie',
  templateUrl: './userbookingmovie.component.html',
  styleUrls: ['./userbookingmovie.component.css']
})
export class UserbookingmovieComponent implements OnInit {
  movieId: number;
  movie: Movie;
  userId: number;
  
  totalCost: number = 0;
  ticketTotal: number = 0;
  bookingFee: number = 4.50; // Static booking fee per transaction
  
  isSubmitting: boolean = false;
  errorMessage: string = '';
  
  selectedSeatsSet: Set<string> = new Set<string>();

  standardSeats: Seat[] = [];
  vipSeats: Seat[] = [];
  platinumSeats: Seat[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService,
    private userStorageService: UserStoreService,
    private screenService: ScreenService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('movieId');
    this.userId = this.userStorageService.authUser?.userId;
    
    if (this.movieId) {
      this.loadMovieDetails();
    }
  }

  loadMovieDetails(): void {
    this.movieService.getMovieById(this.movieId).subscribe(
      (data) => {
        this.movie = data;
        
        // Pre-process arrays for UI badges
        const movieAny: any = this.movie;
        movieAny.genresArray = this.movie.genre ? this.movie.genre.split(/[\/,]/).map(g => g.trim()).filter(g => g) : ['GENERAL'];
        
        // Parse dynamic pricing and blocked seats from DB model if available
        if (data.categoryPrices) {
            this.movieExtras = { categoryPrices: typeof data.categoryPrices === 'string' ? JSON.parse(data.categoryPrices) : data.categoryPrices };
        }
        if (data.blockedSeats) {
            this.movieExtras = this.movieExtras || {};
            this.movieExtras.blockedSeats = typeof data.blockedSeats === 'string' ? JSON.parse(data.blockedSeats) : data.blockedSeats;
        }
        
        this.loadScreenAndInitialize(data);
      },
      (error) => {
        this.errorMessage = 'Error loading movie details';
        console.error('Load movie error', error);
      }
    );
  }

  loadScreenAndInitialize(movieData: Movie): void {
    if (movieData.selectedScreenId) {
       this.screenService.getScreenById(movieData.selectedScreenId).subscribe({
          next: (screen) => {
             this.initializeSeats(screen);
             this.movie = movieData; // Hide skeleton only after seats are ready
             this.calculateTotalCost();
          },
          error: () => {
             this.initializeSeats(null);
             this.movie = movieData; // Hide skeleton only after seats are ready
             this.calculateTotalCost();
          }
       });
    } else {
       this.initializeSeats(null);
       this.movie = movieData; // Hide skeleton only after seats are ready
       this.calculateTotalCost();
    }
  }

  // To hold dynamic prices and blocked seats
  movieExtras: any = null;

  initializeSeats(screenConfig: any): void {
    let blockedCoords: string[] = [];
    
    if (this.movieExtras && this.movieExtras.blockedSeats) {
       blockedCoords = this.movieExtras.blockedSeats;
    }
    
    // Fallback if no specific screen is linked
    if (!screenConfig) {
       screenConfig = {
           rows: 10,
           cols: 12,
           grid: null
       };
    }
    
    if (screenConfig && typeof screenConfig.grid === 'string') {
        try { screenConfig.grid = JSON.parse(screenConfig.grid); } catch(e){}
    }
    
    // Random mock occupied seats for realism, appended to blocked seats
    const occupiedSet = new Set(['0,3', '1,4', '2,8', '4,1', '4,2']); 
    blockedCoords.forEach(c => occupiedSet.add(c));

    this.standardSeats = [];
    this.vipSeats = [];
    this.platinumSeats = [];

    if (screenConfig && screenConfig.grid) {
      const grid: string[][] = screenConfig.grid;
      const rows = grid.length;
      const cols = grid.length > 0 ? grid[0].length : 0;
      
      for (let r = 0; r < rows; r++) {
        let rowLetter = String.fromCharCode(65 + r); // A, B, C...
        for (let c = 0; c < cols; c++) {
          let id = `${rowLetter}${c + 1}`;
          let coordId = `${r},${c}`;
          let cellValue = grid[r] && grid[r][c] ? grid[r][c] : 'standard';
          let type = typeof cellValue === 'string' ? cellValue : (cellValue as any).type || 'standard';
          
          // Seat is occupied if it's in our mocked set or blocked by theatre owner
          let seat: Seat = { id: id, isOccupied: occupiedSet.has(coordId) || occupiedSet.has(id) };
          
          if (type === 'standard') {
            this.standardSeats.push(seat);
          } else if (type === 'vip') {
            this.vipSeats.push(seat);
          } else if (type === 'platinum') {
            this.platinumSeats.push(seat);
          }
        }
      }
    } else {
      // Hard fallback if completely empty
      this.standardSeats = this.generateSeatGrid(4, 10, 65, occupiedSet);
      this.vipSeats = this.generateSeatGrid(4, 12, 69, occupiedSet);
      this.platinumSeats = this.generateSeatGrid(2, 8, 73, occupiedSet);
    }
  }

  private generateSeatGrid(rows: number, cols: number, startCharCode: number, occupiedSet: Set<string>): Seat[] {
    const seats: Seat[] = [];
    for (let r = 0; r < rows; r++) {
      let rowLetter = String.fromCharCode(startCharCode + r);
      for (let c = 1; c <= cols; c++) {
        let id = `${rowLetter}${c}`;
        seats.push({
          id: id,
          isOccupied: occupiedSet.has(id)
        });
      }
    }
    return seats;
  }

  toggleSeat(seat: Seat, categoryPriceMultiplier: number = 1): void {
    if (seat.isOccupied) return;

    if (this.selectedSeatsSet.has(seat.id)) {
      this.selectedSeatsSet.delete(seat.id);
    } else {
      this.selectedSeatsSet.add(seat.id);
    }
    this.calculateTotalCost();
  }

  calculateTotalCost(): void {
    if (this.movie) {
      // Check which category each selected seat is in to apply dynamic pricing
      let total = 0;
      
      let prices = { standard: this.movie.price, vip: this.movie.price + 100, platinum: this.movie.price + 250 };
      if (this.movieExtras && this.movieExtras.categoryPrices) {
         prices = this.movieExtras.categoryPrices;
      }
      
      this.selectedSeatsSet.forEach(seatId => {
        if (this.standardSeats.find(s => s.id === seatId)) {
          total += prices.standard;
        } else if (this.vipSeats.find(s => s.id === seatId)) {
          total += prices.vip;
        } else if (this.platinumSeats.find(s => s.id === seatId)) {
          total += prices.platinum;
        } else {
          total += prices.standard;
        }
      });
      
      this.ticketTotal = total;
      this.totalCost = this.ticketTotal > 0 ? this.ticketTotal + this.bookingFee : 0;
    }
  }

  get selectedSeatsArray(): string[] {
    return Array.from(this.selectedSeatsSet);
  }

  createBooking(): void {
    if (this.selectedSeatsSet.size === 0) {
      this.errorMessage = 'Please select at least one seat.';
      return;
    }

    this.isSubmitting = true;

    const booking: Booking = {
      userId: this.userId,
      movieId: this.movieId,
      seatCount: this.selectedSeatsSet.size,
      selectedSeats: Array.from(this.selectedSeatsSet).join(', '),
      totalCost: this.totalCost
    };

    this.bookingService.addBooking(this.movieId, this.userId, booking).subscribe(
      () => {
        this.isSubmitting = false;
        this.toastService.showSuccess('Booking Confirmed', 'Your movie tickets have been booked successfully!');
        this.router.navigate(['/user/view/Mybookings']);
      },
      (error) => {
        this.isSubmitting = false;
        this.toastService.showError('Booking Failed', 'There was an error processing your booking.');
        console.error('Booking error', error);
      }
    );
  }
}
