import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription, forkJoin } from 'rxjs';
import { TheatreService } from 'src/app/services/theatre.service';
import { ScreenService } from 'src/app/services/screen.service';
import { Theatre } from 'src/app/models/theatre.model';
import { ScreenConfig } from 'src/app/models/screen.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isInitialLoading: boolean = true;
  heroTransform: string = 'scale(1) translate(0px, 0px)';
  
  masterMoviesList: Movie[] = [];
  allMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  moviesByGenre: { [genre: string]: Movie[] } = {};
  genreKeys: string[] = [];
  
  moviesByLanguage: { [lang: string]: Movie[] } = {};
  languageKeys: string[] = [];
  
  // Location Data
  availableCities: string[] = [];
  
  // Search & Filter State
  searchQuery: string = '';
  filterDate: string = '';
  showDatePopup: boolean = false;
  popupFilteredMovies: Movie[] = [];
  private searchSub: Subscription;

  constructor(
    private movieService: MovieService, 
    private searchService: SearchService,
    private theatreService: TheatreService,
    private screenService: ScreenService
  ) { }

  ngOnInit(): void {
    this.extractCities();
    this.loadMovies();
    
    this.searchSub = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query.toLowerCase();
      if (this.masterMoviesList.length > 0) {
        this.filterAndCategorizeMovies();
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
  
  extractCities(): void {
    // City extraction removed for search service
  }
  
  loadMovies(): void {
    // 1. Instant Cache Load (Stale-While-Revalidate)
    const cachedData = localStorage.getItem('homeMoviesCache');
    if (cachedData) {
        try {
            const parsed = JSON.parse(cachedData);
            this.masterMoviesList = parsed;
            this.filterAndCategorizeMovies();
            this.isInitialLoading = false; // Bypass skeleton UI instantly
        } catch(e) {
            this.isInitialLoading = true;
        }
    } else {
        this.isInitialLoading = true;
    }

    // 2. Background Revalidation
    forkJoin({
      movies: this.movieService.getAllMovies(),
      theatres: this.theatreService.getAllTheatres(),
      screens: this.screenService.getAllScreens()
    }).subscribe(
      (res) => {
        const data = res.movies;
        const theatres = res.theatres;
        const screens = res.screens;

        this.masterMoviesList = data.map(movie => {
          const m: any = movie;
          
          // Ensure defaults if backend returned nulls
          m.rating = m.rating || 0;
          m.ratingCount = m.ratingCount || 0;
          
          // Resolve City and Theatre Name from Database mappings
          if (m.selectedScreenId) {
              const screen = screens.find((s: any) => s.id === m.selectedScreenId);
              if (screen) {
                  if (screen.theatreId) {
                      const theatre = theatres.find((t: any) => t.id === screen.theatreId);
                      if (theatre) {
                          m.city = theatre.state; // Use state as city fallback
                          m.theatreName = theatre.name;
                      }
                  }
              }
          }
          return m;
        });
        
        // Cache the fully processed list
        localStorage.setItem('homeMoviesCache', JSON.stringify(this.masterMoviesList));
        
        this.filterAndCategorizeMovies();
        this.isInitialLoading = false;
      },
      (error) => {
        console.error('Failed to load movies for home page', error);
        this.isInitialLoading = false;
      }
    );
  }
  
  private filterAndCategorizeMovies() {
      if (!this.searchQuery && !this.filterDate) {
          this.allMovies = [...this.masterMoviesList];
      } else {
          // Fetch screens and theatres synchronously if possible or just use a cached reference.
          // Since we already resolved this in loadMovies into m.city and m.theatreName, we can just check those!
          this.allMovies = this.masterMoviesList.filter((m: any) => {
              let matchesSearch = true;
              
              // Search Query Filter
              if (this.searchQuery) {
                  matchesSearch = false; // default to false if query exists
                  if (m.title && m.title.toLowerCase().includes(this.searchQuery)) matchesSearch = true;
                  if (m.city && m.city.toLowerCase().includes(this.searchQuery)) matchesSearch = true;
                  if (m.theatreName && m.theatreName.toLowerCase().includes(this.searchQuery)) matchesSearch = true;
              }
              
              return matchesSearch;
          });
      }
      
    // Step 2: Categorize
    this.categorizeMovies();
  }
  
  private categorizeMovies() {
    // Reset lists
    this.topRatedMovies = [];
    this.moviesByGenre = {};
    this.genreKeys = [];
    this.moviesByLanguage = {};
    this.languageKeys = [];

    this.allMovies.forEach(movie => {
      // Group by Genre
      if (movie.genre) {
        // Split by comma or slash if multiple genres exist
        const genres = movie.genre.split(/[\/,]/).map(g => g.trim());
        genres.forEach(g => {
           if(g) {
               if(!this.moviesByGenre[g]) {
                 this.moviesByGenre[g] = [];
                 this.genreKeys.push(g);
               }
               this.moviesByGenre[g].push(movie);
           }
        });
      }
      
      // Group by Language
      if (movie.language) {
          if (!this.moviesByLanguage[movie.language]) {
              this.moviesByLanguage[movie.language] = [];
              this.languageKeys.push(movie.language);
          }
          this.moviesByLanguage[movie.language].push(movie);
      }
      
      // 3. Top Rated Movies (sort by rating descending)
    });

    this.topRatedMovies = [...this.allMovies]
      .filter(m => m.rating && m.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10); // top 10

    // 4. Setup Carousel
    this.carouselMovies = [...this.topRatedMovies].slice(0, 5);
    if (this.carouselMovies.length < 3) {
      // If not enough top rated, fill with any movies
      this.carouselMovies = [...new Set([...this.carouselMovies, ...this.allMovies])].slice(0, 5);
    }
    // Setup backdrop for carousel
    this.carouselMovies = this.carouselMovies.map((m, idx) => {
       const movieAny: any = m;
       
       if (m.posterBase64) {
           if (m.posterBase64.includes('image.pollinations.ai')) {
               // If it's an AI poster, try to get a wide version of the exact same prompt
               movieAny.backdropBase64 = m.posterBase64.replace('width=400', 'width=1920').replace('height=600', 'height=1080');
           } else {
               // If it's a custom uploaded image (base64 or URL), use it directly!
               movieAny.backdropBase64 = m.posterBase64;
           }
       } else {
           // Fallback if no poster exists at all (using picsum to bypass aggressive rate limit blockers)
           movieAny.backdropBase64 = `https://picsum.photos/seed/${this.encodeTitle(m.title)}/1920/1080`;
       }
       
       return movieAny;
    });

    this.startCarousel();
  }

  onHeroMouseMove(event: MouseEvent): void {
    const x = (window.innerWidth / 2 - event.pageX) / 50;
    const y = (window.innerHeight / 2 - event.pageY) / 50;
    this.heroTransform = `scale(1.1) translate(${x}px, ${y}px)`;
  }

  onHeroMouseLeave(): void {
    this.heroTransform = 'scale(1) translate(0px, 0px)';
  }
  
  getStars(rating: number): number[] {
    return Array(Math.round(rating || 0)).fill(0);
  }

  encodeTitle(title: string): string {
    return encodeURIComponent(title || 'Movie');
  }

  // --- CAROUSEL LOGIC ---
  currentSlide = 0;
  carouselMovies: any[] = [];
  slideInterval: any;

  startCarousel() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    if (this.carouselMovies.length <= 1) return;
    this.slideInterval = setInterval(() => {
        this.nextSlide();
    }, 10000); // Slower 10s transition for premium cinematic feel
  }

  // --- QUICK VIEW LOGIC ---
  selectedMovieForQuickView: any = null;
  quickViewScreenName: string = '';
  quickViewScreenAddress: string = '';
  isQuickViewLoading: boolean = false;

  openQuickView(movie: any) {
    this.selectedMovieForQuickView = movie;
    
    // We already have city and theatreName resolved in loadMovies()!
    // No need to fetch from backend, make it instant.
    if (movie.theatreName) {
      this.quickViewScreenName = movie.theatreName;
      this.quickViewScreenAddress = movie.city || 'CINEPRESTIGE Flagship Theatre';
    } else {
      this.quickViewScreenName = 'Premium Auditorium';
      this.quickViewScreenAddress = 'CINEPRESTIGE Flagship Theatre';
    }
    
    this.isQuickViewLoading = false;
    
    // Stop carousel while viewing modal
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  closeQuickView() {
    this.selectedMovieForQuickView = null;
    this.startCarousel(); // Resume carousel
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselMovies.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.startCarousel(); // reset timer
  }

  scrollRow(element: HTMLElement, direction: 'left' | 'right') {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.6 : window.innerWidth * 0.8;
      if (direction === 'left') {
          element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
          element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
  }
  
  getCarouselTransform(index: number): string {
    const total = this.carouselMovies.length;
    if (total === 0) return '';
    
    let diff = index - this.currentSlide;
    
    // Handle wrap around for smooth infinite feeling
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    if (diff === 0) {
      // Center
      return 'translateX(0) scale(1) rotateY(0deg)';
    } else if (diff === 1 || diff === -1) {
      // Adjacent
      const direction = diff > 0 ? 1 : -1;
      return `translateX(${direction * 40}%) scale(0.85) rotateY(${direction * -15}deg)`;
    } else if (diff === 2 || diff === -2) {
      // Far
      const direction = diff > 0 ? 1 : -1;
      return `translateX(${direction * 70}%) scale(0.7) rotateY(${direction * -25}deg)`;
    } else {
      // Hidden behind
      const direction = diff > 0 ? 1 : -1;
      return `translateX(${direction * 90}%) scale(0.5) rotateY(${direction * -35}deg)`;
    }
  }

  getCarouselZIndex(index: number): number {
    const total = this.carouselMovies.length;
    let diff = Math.abs(index - this.currentSlide);
    if (diff > Math.floor(total / 2)) diff = total - diff;
    
    return 50 - diff * 10;
  }

  getCarouselOpacity(index: number): number {
    const total = this.carouselMovies.length;
    let diff = Math.abs(index - this.currentSlide);
    if (diff > Math.floor(total / 2)) diff = total - diff;

    if (diff === 0) return 1;
    if (diff === 1) return 0.8;
    if (diff === 2) return 0.5;
    return 0;
  }
  
  checkOverflow(element: HTMLElement): boolean {
      if (!element) return false;
      return element.scrollWidth > element.clientWidth;
  }

  onDateChange() {
    if (this.filterDate) {
      this.popupFilteredMovies = this.masterMoviesList.filter((m: any) => m.showDate === this.filterDate);
      this.showDatePopup = true;
    } else {
      this.showDatePopup = false;
      this.popupFilteredMovies = [];
    }
  }
  
  closeDatePopup() {
      this.showDatePopup = false;
      this.filterDate = '';
      this.popupFilteredMovies = [];
  }
  
  clearDateFilter() {
      this.closeDatePopup();
      this.filterAndCategorizeMovies();
  }
}
