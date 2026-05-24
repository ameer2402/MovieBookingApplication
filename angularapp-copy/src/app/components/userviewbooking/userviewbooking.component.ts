import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
import { TheatreService } from 'src/app/services/theatre.service';
import { ScreenService } from 'src/app/services/screen.service';
import { ToastService } from 'src/app/services/toast.service';
import { jsPDF } from 'jspdf';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-userviewbooking',
  templateUrl: './userviewbooking.component.html',
  styleUrls: ['./userviewbooking.component.css']
})
export class UserviewbookingComponent implements OnInit {
  bookings: Booking[] = [];
  userId: number;
  errorMessage: string = '';
  
  // Modal State
  selectedBookingForQR: Booking | null = null;
  showQRModal: boolean = false;

  constructor(
    private bookingService: BookingService, 
    private userStoreService: UserStoreService,
    private theatreService: TheatreService,
    private screenService: ScreenService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.userId = this.userStoreService.authUser?.userId;
    this.loadUserBookings();
  }

  loadUserBookings() {
    forkJoin({
      bookings: this.bookingService.getUserBookings(this.userId),
      theatres: this.theatreService.getAllTheatres(),
      screens: this.screenService.getAllScreens()
    }).subscribe({
      next: (res) => {
        const theatres = res.theatres;
        const screens = res.screens;
        
        this.bookings = res.bookings.reverse().map(booking => {
           const b: any = booking;
           if (b.movie && b.movie.selectedScreenId) {
               const screen = screens.find((s: any) => s.id === b.movie.selectedScreenId);
               if (screen && screen.theatreId) {
                   const theatre = theatres.find((t: any) => t.id === screen.theatreId);
                   if (theatre) {
                       b.theatreName = theatre.name;
                       b.city = theatre.state;
                   }
               }
           }
           return b;
        });
      },
      error: (error) => {
        console.error("Error fetching bookings", error);
        this.errorMessage = "Failed to load booking history. Please try again later.";
      }
    });
  }

  openQRModal(booking: Booking) {
    this.selectedBookingForQR = booking;
    this.showQRModal = true;
  }

  closeQRModal() {
    this.showQRModal = false;
    this.selectedBookingForQR = null;
  }

  isMovieInPast(booking: Booking): boolean {
    const b: any = booking;
    if (!b.movie || !b.movie.showDate) return false;
    
    const movieDate = new Date(b.movie.showDate);
    // Include time if available
    if (b.movie.showTime) {
      const [hours, minutes] = b.movie.showTime.split(':');
      movieDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      movieDate.setHours(23, 59, 59, 999);
    }
    
    return new Date() > movieDate;
  }

  hasRated(booking: Booking): boolean {
    return localStorage.getItem(`rated_${booking.id}`) === 'true';
  }

  rateMovie(booking: Booking, rating: number) {
    const b: any = booking;
    if(!b.movie) return;
    
    // Rating logic goes here. Since we are moving away from localStorage entirely, 
    // we would ideally call this.movieService.updateMovie() to update rating directly.
    // For now, we will simulate the rating update in the frontend object directly.
    
    let currentRating = b.movie.rating || 0;
    let count = b.movie.ratingCount || 0;
    
    let newRating = ((currentRating * count) + rating) / (count + 1);
    
    b.movie.rating = newRating;
    b.movie.ratingCount = count + 1;
    
    // In a real scenario, make a PUT request to the backend:
    // this.movieService.updateMovie(b.movie.id, b.movie).subscribe();
    
    localStorage.setItem(`rated_${booking.id}`, 'true');
    
    this.toastService.showSuccess('Rating Submitted', `Thank you! You rated ${b.movie.title} ${rating} stars.`);
  }

  downloadPDF(booking: Booking) {
    const doc = new jsPDF();
    const b: any = booking;
    
    // Background color (very dark grey for a premium feel)
    doc.setFillColor(18, 18, 18);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Movie Poster Background / Side Image
    if (b.movie.posterBase64) {
        try {
            // Faint poster backdrop
            doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
            doc.addImage(b.movie.posterBase64, 'JPEG', 0, 0, 210, 297);
            doc.setGState(new (doc as any).GState({ opacity: 1.0 }));
            
            // Solid poster on the right
            doc.addImage(b.movie.posterBase64, 'JPEG', 140, 60, 50, 75);
        } catch(e) {
            console.warn('Failed to embed poster in PDF', e);
        }
    }
    
    // Add title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(229, 9, 20); // Primary CINEPRESTIGE red
    doc.text('CINEPRESTIGE', 20, 30);
    
    // Add Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(200, 200, 200);
    doc.text('Confirmed E-Ticket', 20, 40);
    
    // Line separator
    doc.setDrawColor(229, 9, 20);
    doc.setLineWidth(1.0);
    doc.line(20, 48, 190, 48);
    
    // Movie Details
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    
    // Split text if title is too long so it doesn't overlap poster
    const splitTitle = doc.splitTextToSize(b.movie.title.toUpperCase(), 110);
    doc.text(splitTitle, 20, 65);
    
    const titleHeight = splitTitle.length * 10;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(180, 180, 180);
    doc.text(`${b.movie.genre}  |  ${b.movie.language || 'Multiple Languages'}  |  ${b.movie.duration} mins`, 20, 65 + titleHeight);
    
    // Location Details
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('CINEMA LOCATION', 20, 80 + titleHeight);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text(`${b.theatreName || 'CINEPRESTIGE Flagship'}, ${b.city || 'India'}`, 20, 88 + titleHeight);
    
    // Booking Details Box
    doc.setFillColor(30, 30, 30);
    doc.roundedRect(20, 145, 170, 75, 3, 3, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(150, 150, 150);
    doc.text('DATE & TIME', 30, 160);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`${b.movie.showDate} at ${b.movie.showTime || 'Standard Time'}`, 30, 168);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('SEATS BOOKED', 110, 160);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`${b.selectedSeats || b.seatCount + ' Seats'}`, 110, 168);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('TOTAL PAID', 30, 190);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`Rs. ${b.totalCost}`, 30, 198);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('BOOKING ID', 110, 190);
    doc.setTextColor(229, 9, 20); // Red booking ID
    doc.setFont('helvetica', 'bold');
    doc.text(`CP-TKT-${b.id}`, 110, 198);
    
    // Terms & Conditions
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('Terms & Conditions:', 20, 240);
    doc.text('- Please present this e-ticket along with a valid ID at the cinema entrance.', 20, 250);
    doc.text('- Tickets are non-transferable and non-refundable within 2 hours of showtime.', 20, 260);
    doc.text('- Outside food and beverages are strictly prohibited inside the auditorium.', 20, 270);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Enjoy your premium cinematic experience.', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`Cineprestige_Ticket_${b.movie.title.replace(/\s+/g, '_')}_${b.id}.pdf`);
    
    this.toastService.showSuccess('Ticket Downloaded', 'Your PDF ticket has been saved to your device.');
  }
}
