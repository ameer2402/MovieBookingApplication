import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TheatreService } from './theatre.service';
import { ScreenService } from './screen.service';
import { MovieService } from './movie.service';
import { User } from '../models/user.model';
import { Theatre } from '../models/theatre.model';
import { Movie } from '../models/movie.model';
import { ScreenConfig as ApiScreenConfig } from '../models/screen.model';
import { catchError, concatMap, delay, of, tap, from } from 'rxjs';
import { UNIQUE_INDIAN_MOVIES } from './indian-movies-data';

@Injectable({
  providedIn: 'root'
})
export class DataSeederService {
  private isSeeding = false;

  constructor(
    private authService: AuthService,
    private theatreService: TheatreService,
    private screenService: ScreenService,
    private movieService: MovieService
  ) {}

  public seedDataIfRequired(): void {
    if (localStorage.getItem('cineprestige_seeded_verified_v5') === 'true' || this.isSeeding) {
      return;
    }
    this.isSeeding = true;
    localStorage.clear(); // Clear all old metadata and legacy data
    localStorage.setItem('cineprestige_seeded_verified_v5', 'true'); // Immediately set to prevent double fires
    
    console.log('Initiating MASSIVE Automated Data Seeding (50 Movies)...');

    this.seedAdmins();
  }

  private seedAdmins() {
    const admin1 = new User('admin.mumbai@cinema.com', 'SecurePass123!', 'Admin Mumbai', '1234567890', 'ADMIN');
    const admin2 = new User('admin.delhi@cinema.com', 'SecurePass123!', 'Admin Delhi', '0987654321', 'ADMIN');

    this.authService.register(admin1).pipe(
      catchError(() => of(null)),
      concatMap(() => this.authService.register(admin2).pipe(catchError(() => of(null))))
    ).subscribe(() => {
      this.seedTheatresAndScreens();
    });
  }

  private seedTheatresAndScreens() {
    const theatres = [
      { name: 'PVR ICON', state: 'Mumbai' },
      { name: 'INOX Megaplex', state: 'Delhi' },
      { name: 'Cinepolis Nexus', state: 'Bangalore' }
    ];

    let createdTheatres: any[] = [];

    // Seed Theatre 1
    this.theatreService.addTheatre(theatres[0]).pipe(
      catchError(() => of(null)),
      concatMap(t1 => {
        if (t1) createdTheatres.push(t1);
        return this.theatreService.addTheatre(theatres[1]).pipe(catchError(() => of(null)));
      }),
      concatMap(t2 => {
        if (t2) createdTheatres.push(t2);
        return this.theatreService.addTheatre(theatres[2]).pipe(catchError(() => of(null)));
      }),
      concatMap(t3 => {
        if (t3) createdTheatres.push(t3);
        
        // Seed Screens for created theatres
        let screenObservables = [];
        const gridArray = Array(10).fill(0).map(() => Array(15).fill({ type: 'standard', status: 'available' }));
        const gridStr = JSON.stringify(gridArray);
        
        createdTheatres.forEach((theatre, index) => {
           const screenConfig: ApiScreenConfig = {
               name: `Screen Alpha ${index + 1}`,
               type: 'Premium',
               capacity: 150,
               grid: gridStr,
               theatreId: theatre.id
           };
           screenObservables.push(this.screenService.addScreen(screenConfig).pipe(catchError(() => of(null))));
        });
        
        // Run them sequentially just to be safe
        if (screenObservables.length > 0) {
            return screenObservables[0].pipe(
               concatMap(() => screenObservables.length > 1 ? screenObservables[1] : of(null)),
               concatMap(() => screenObservables.length > 2 ? screenObservables[2] : of(null))
            );
        }
        return of(null);
      })
    ).subscribe(() => {
       // Fetch screens directly from DB to continue seeding
       this.screenService.getAllScreens().subscribe(screens => {
         if (screens && screens.length > 0) {
            this.seedMovies(screens);
         } else {
            console.error('No screens available to seed movies.');
            this.finalizeSeeding();
         }
       });
    });
  }

  private seedMovies(screens: any[]) {
    // Generate future dates starting next month
    const getFutureDateByDays = (daysAhead: number) => {
        const d = new Date();
        d.setDate(d.getDate() + daysAhead);
        return d.toISOString().split('T')[0];
    };

    const moviesData: any[] = [];
    let daysAhead = 15; // Start 15 days from now
    const times = ['14:00', '17:00', '18:00', '19:30', '20:00'];
    const languages = ['Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];
    
    // Generate exactly up to 100 unique movies
    const maxMovies = Math.min(100, UNIQUE_INDIAN_MOVIES.length);
    for (let idx = 0; idx < maxMovies; idx++) {
        const tm = UNIQUE_INDIAN_MOVIES[idx];
        const screenId = screens[idx % screens.length]?.id || screens[0]?.id;
        const time = times[idx % times.length];
        const language = languages[idx % languages.length];
        
        moviesData.push({
           movie: { 
               id: 0, 
               title: tm.title, 
               duration: tm.duration, 
               genre: tm.genre, 
               price: 250, 
               totalSeats: 150, 
               language: language, 
               showDate: getFutureDateByDays(daysAhead), 
               showTime: time, 
               selectedScreenId: screenId, 
               posterBase64: tm.posterBase64, 
               categoryPrices: JSON.stringify({ standard: 250, vip: 400, platinum: 600 }), 
               blockedSeats: "[]" 
           }
        });
        daysAhead += 5; // Space them 5 days apart to fit 100 movies smoothly into 2027
    }

    if (moviesData.length > 0) {
        console.log(`Seeding exactly ${moviesData.length} movies...`);
        // Use from() and concatMap() to cleanly serialize 50 requests without blowing up the stack
        from(moviesData).pipe(
           concatMap(md => this.movieService.addMovie(md.movie as Movie).pipe(
              tap((addedMovie: any) => console.log('Seeded movie directly to db: ', addedMovie?.title)),
              catchError(err => {
                console.error('Failed to seed movie', err);
                return of(null);
              })
           ))
        ).subscribe({
           complete: () => {
              this.finalizeSeeding();
           }
        });
    } else {
        this.finalizeSeeding();
    }
  }

  private finalizeSeeding() {
    // localStorage flag already set at top
    console.log('Massive Automated Data Seeding Complete (50 Movies)!');
    // Trigger a mild reload so the home page picks up the new movies if the user is already looking at it
    window.location.reload();
  }
}
