import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ScreenService } from 'src/app/services/screen.service';
import { ToastService } from 'src/app/services/toast.service';
import { ScreenConfig } from '../admintheatreconfig/admintheatreconfig.component';

@Component({
  selector: 'app-adminaddmovie',
  templateUrl: './adminaddmovie.component.html',
  styleUrls: ['./adminaddmovie.component.css']
})
export class AdminaddmovieComponent implements OnInit {
  movie: Movie = { id: 0, title: '', duration: 0, genre: '', price: 0, totalSeats: 0, showDate: '', showTime: '', language: '' };
  isEditing: boolean = false;
  errorMessage: string = '';
  movieId: number;

  screens: ScreenConfig[] = [];
  selectedScreenId: string = '';
  
  categoryPrices: { standard: number, vip: number, platinum: number } = {
    standard: 150,
    vip: 250,
    platinum: 400
  };
  
  // Format: "r,c" strings representing coordinates of blocked/reserved seats
  blockedSeats: string[] = [];

  posterBase64: string | null = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private screenService: ScreenService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.loadScreens();
    
    this.route.queryParams.subscribe(params => {
      this.movieId = params['id'];
    })
    if (this.movieId) {
      this.isEditing = true;
      this.loadMovie(this.movieId);
    }
  }
  
  loadScreens(): void {
    this.screenService.getAllScreens().subscribe({
      next: (screens) => {
         this.screens = screens.map((s: any) => ({
             id: s.id,
             theatreId: s.theatreId,
             name: s.name,
             type: s.type,
             rows: s.grid ? JSON.parse(s.grid).length : 10,
             cols: s.grid ? (JSON.parse(s.grid)[0] ? JSON.parse(s.grid)[0].length : 12) : 12,
             grid: s.grid ? JSON.parse(s.grid) : []
         }));
         
         if (this.screens.length > 0 && !this.selectedScreenId) {
             this.selectedScreenId = this.screens[0].id;
             this.movie.totalSeats = this.screens[0].rows * this.screens[0].cols;
         }
      },
      error: (err) => console.error('Failed to load screens', err)
    });
  }

  onScreenChange(): void {
    const screen = this.getScreenById(this.selectedScreenId);
    if (screen) {
       this.movie.totalSeats = screen.rows * screen.cols;
       // Clear blocked seats if changing screen
       this.blockedSeats = [];
    }
  }

  getScreenById(id: string): ScreenConfig | null {
    return this.screens.find(s => s.id === id) || null;
  }

  toggleSeatBlock(r: number, c: number): void {
     const id = `${r},${c}`;
     const idx = this.blockedSeats.indexOf(id);
     if (idx > -1) {
        this.blockedSeats.splice(idx, 1);
     } else {
        this.blockedSeats.push(id);
     }
  }
  
  isSeatBlocked(r: number, c: number): boolean {
     return this.blockedSeats.includes(`${r},${c}`);
  }

  onFileSelected(event: any): void {
     const file = event.target.files[0];
     if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
           this.posterBase64 = e.target.result;
        };
        reader.readAsDataURL(file);
     }
  }

  loadMovie(id: number): void {
    this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        this.movie = data;
        if (this.movie.selectedScreenId) this.selectedScreenId = this.movie.selectedScreenId;
        if (this.movie.categoryPrices) {
            this.categoryPrices = typeof this.movie.categoryPrices === 'string' ? JSON.parse(this.movie.categoryPrices) : this.movie.categoryPrices;
        }
        if (this.movie.blockedSeats) {
            this.blockedSeats = typeof this.movie.blockedSeats === 'string' ? JSON.parse(this.movie.blockedSeats) : this.movie.blockedSeats;
        }
        if (this.movie.posterBase64) this.posterBase64 = this.movie.posterBase64;
      },
      error: (error) => {
        this.errorMessage = 'Error loading movie';
        this.toastService.showError('Error', this.errorMessage);
      }
    });
  }
  
  addOrUpdateMovie(): void {
    // Ensure movie.price has a default value for the backend since we removed the main UI field
    this.movie.price = this.categoryPrices.standard;
    this.movie.selectedScreenId = this.selectedScreenId;
    this.movie.posterBase64 = this.posterBase64;
    this.movie.categoryPrices = JSON.stringify(this.categoryPrices);
    this.movie.blockedSeats = JSON.stringify(this.blockedSeats);
    
    // The backend now completely handles the Collision Detection and Data Validation!
    if (this.isEditing) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe({
        next: () => {
          this.closeModal(true);
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastService.showError("Collision Detected", error.error?.error || "The selected Screen is already playing another movie during this time slot.");
          } else if (error.status === 400) {
            this.toastService.showError("Validation Error", "Please ensure all required fields are filled out correctly.");
          } else {
            this.toastService.showError('Error', 'Error updating movie');
          }
        }
      });
    } else {
      this.movieService.addMovie(this.movie).subscribe({
        next: () => {
          this.closeModal(false);
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastService.showError("Collision Detected", error.error?.error || "The selected Screen is already playing another movie during this time slot.");
          } else if (error.status === 400) {
            this.toastService.showError("Validation Error", "Please ensure all required fields are filled out correctly.");
          } else {
            this.toastService.showError('Error', 'Error adding movie');
          }
        }
      });
    }
  }

  // Removed saveExtrasToLocalStorage as it is now saved directly in the DB


  closeModal(isUpdate: boolean): void {
    this.toastService.showSuccess('Success', isUpdate ? "Movie updated Successfully" : "Movie Added Successfully");
    this.router.navigate(['admin/view/Movies']);
  }
  
  cancelOperation(): void {
    this.router.navigate(['admin/view/Movies']);
  }
}
