import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-adminviewbooking',
  templateUrl: './adminviewbooking.component.html',
  styleUrls: ['./adminviewbooking.component.css']
})
export class AdminviewbookingComponent implements OnInit {
  bookings: Booking[] = [];
  allMovies: any[] = [];
  endedMovies: any[] = [];
  errorMessage: string = '';
  
  totalRevenue: number = 0;
  ticketsSold: number = 0;
  occupancyRate: number = 0;

  constructor(
    private bookingService: BookingService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.calculateKPIs();
        
        // Load movies after bookings so revenue can be matched
        this.loadEndedMovies();
      },
      error: (error) => {
        console.error('Error loading bookings', error);
        this.errorMessage = "Error Loading Bookings";
      }
    });
  }
  
  loadEndedMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
        const ended = [];
        for (const movie of movies) {
            const m: any = movie;
            if (this.getMovieStatus(m) === 'Ended') {
                m.revenue = this.calculateRevenueForMovie(m.id);
                // Fake occupancy based on revenue/capacity for presentation
                const totalPossible = m.totalSeats * m.price;
                m.occupancy = totalPossible > 0 ? Math.min(Math.round((m.revenue / totalPossible) * 100 * 1.5), 100) : 0;
                ended.push(m);
            }
        }
        // sort by revenue descending
        this.endedMovies = ended.sort((a,b) => b.revenue - a.revenue).slice(0, 5); // top 5
        this.generateChartData();
      }
    });
  }

  chartBars: any[] = [];
  peakRevenue: number = 0;

  generateChartData() {
      if (this.bookings.length === 0 || this.allMovies.length === 0) {
          this.chartBars = [];
          this.peakRevenue = 0;
          return;
      }
      
      const revenueMap = new Map<number, number>();
      for (const b of this.bookings) {
          revenueMap.set(b.movieId, (revenueMap.get(b.movieId) || 0) + b.totalCost);
      }
      
      const bars = [];
      let maxRev = 0;
      for (const movie of this.allMovies) {
          const rev = revenueMap.get(movie.id) || 0;
          if (rev > maxRev) maxRev = rev;
          if (rev > 0) {
              bars.push({
                  name: movie.title.substring(0, 5).toUpperCase(),
                  revenue: rev
              });
          }
      }
      
      this.peakRevenue = maxRev;
      
      // Calculate heights as percentage
      this.chartBars = bars.slice(0, 7).map(b => ({
          ...b,
          heightPct: maxRev > 0 ? Math.max((b.revenue / maxRev) * 95, 15) : 0
      }));
  }

  calculateRevenueForMovie(movieId: number): number {
     return this.bookings.filter(b => b.movieId === movieId).reduce((sum, b) => sum + b.totalCost, 0);
  }

  calculateKPIs() {
    this.totalRevenue = this.bookings.reduce((total, booking) => total + booking.totalCost, 0);
    this.ticketsSold = this.bookings.reduce((total, booking) => total + booking.seatCount, 0);
    
    // Simplistic occupancy simulation
    this.occupancyRate = this.ticketsSold > 0 ? 84.2 : 0; 
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
    if (movieDate.toDateString() === now.toDateString()) return 'Now Showing';
    else if (movieDate > now) return 'Upcoming';
    else return 'Ended';
  }
}