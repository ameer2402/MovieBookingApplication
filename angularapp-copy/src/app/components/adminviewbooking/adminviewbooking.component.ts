import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';

interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-adminviewbooking',
  templateUrl: './adminviewbooking.component.html',
  styleUrls: ['./adminviewbooking.component.css']
})
export class AdminviewbookingComponent implements OnInit {
  bookings: Booking[] = [];
  errorMessage: string = '';
  
  // Sorting properties
  sortOptions: SortOption[] = [
    { value: 'id', label: 'Booking ID' },
    { value: 'seatCount', label: 'Number of Seats' },
    { value: 'totalCost', label: 'Total Cost' }
  ];
  selectedSortField: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (error) => {
        console.error('Error loading bookings', error);
        this.errorMessage = "Error Loading Bookings";
      }
    });
  }

  // Sorting method
  sortBookings() {
    this.bookings.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.selectedSortField) {
        case 'id':
          valueA = a.id;
          valueB = b.id;
          break;
        case 'seatCount':
          valueA = a.seatCount;
          valueB = b.seatCount;
          break;
        case 'totalCost':
          valueA = a.totalCost;
          valueB = b.totalCost;
          break;
        default:
          return 0;
      }

      // Compare values
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Toggle sort direction
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortBookings();
  }

  // Calculate total revenue
  calculateTotalRevenue(): number {
    return this.bookings.reduce((total, booking) => total + booking.totalCost, 0);
  }

  // On sort field change
  onSortFieldChange() {
    this.sortBookings();
  }
}