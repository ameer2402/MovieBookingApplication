import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

import { TheatreService } from 'src/app/services/theatre.service';
import { ScreenService } from 'src/app/services/screen.service';
import { ToastService } from 'src/app/services/toast.service';
import { Theatre } from 'src/app/models/theatre.model';
import { ScreenConfig as ApiScreenConfig } from 'src/app/models/screen.model';
import { forkJoin, Observable } from 'rxjs';

// UI Specific Screen Config
export interface ScreenConfig {
  id: string;
  theatreId: string;
  name: string;
  type: string;
  rows: number;
  cols: number;
  grid: string[][];
}

@Component({
  selector: 'app-admintheatreconfig',
  templateUrl: './admintheatreconfig.component.html',
  styleUrls: ['./admintheatreconfig.component.css']
})
export class AdmintheatreconfigComponent implements OnInit {
  currentView: 'theatres' | 'screens' = 'theatres';
  currentTool: string = 'vip';
  
  theatres: Theatre[] = [];
  selectedTheatre: Theatre | null = null;
  newTheatre: Theatre = { id: '', name: '', state: '' };
  
  screens: ScreenConfig[] = [];
  theatreScreens: ScreenConfig[] = [];
  selectedScreenIndex: number = 0;
  
  // Bound to the inputs
  inputRows: number = 10;
  inputCols: number = 12;

  // Add numScreens UI helper
  newTheatreNumScreens: number = 1;

  constructor(
    private movieService: MovieService,
    private theatreService: TheatreService,
    private screenService: ScreenService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    forkJoin({
      theatres: this.theatreService.getAllTheatres(),
      screens: this.screenService.getAllScreens()
    }).subscribe(res => {
      this.theatres = res.theatres;
      
      this.screens = res.screens.map(apiScreen => {
          let gridArray: string[][] = [];
          if (apiScreen.grid) {
              try { gridArray = JSON.parse(apiScreen.grid); } catch(e){}
          }
          let r = gridArray.length > 0 ? gridArray.length : 10;
          let c = gridArray.length > 0 && gridArray[0] ? gridArray[0].length : 12;
          
          return {
              id: apiScreen.id!,
              theatreId: apiScreen.theatreId,
              name: apiScreen.name,
              type: apiScreen.type,
              rows: r,
              cols: c,
              grid: gridArray.length > 0 ? gridArray : this.createGrid(r, c)
          };
      });
    }, error => {
      console.error('Failed to load data from backend', error);
      this.toastService.showError('Database Error', 'Could not connect to the database.');
    });
  }
  
  createNewTheatre() {
    if (!this.newTheatre.name || !this.newTheatre.state) {
        this.toastService.showError('Validation Error', 'Please provide name and state.');
        return;
    }
    
    this.theatreService.addTheatre(this.newTheatre).subscribe(savedTheatre => {
        this.theatres.push(savedTheatre);
        
        // Auto-generate screens
        let screenObservables: Observable<any>[] = [];
        for (let i = 0; i < this.newTheatreNumScreens; i++) {
            let gridData = this.createGrid(10, 12);
            let apiScreen: ApiScreenConfig = {
                theatreId: savedTheatre.id!,
                name: `Screen ${i + 1}`,
                type: 'Standard',
                capacity: 120,
                grid: JSON.stringify(gridData)
            };
            screenObservables.push(this.screenService.addScreen(apiScreen));
        }
        
        if (screenObservables.length > 0) {
            forkJoin(screenObservables).subscribe(() => {
                this.loadData();
                this.toastService.showSuccess('Success', 'Theatre and screens created successfully.');
            });
        } else {
            this.toastService.showSuccess('Success', 'Theatre created successfully.');
        }
        
        this.newTheatre = { name: '', state: '' };
        this.newTheatreNumScreens = 1;
    }, error => {
        console.error('Failed to create theatre', error);
        this.toastService.showError('Error', 'Failed to save theatre to DB');
    });
  }
  
  openTheatre(theatre: Theatre) {
    this.selectedTheatre = theatre;
    this.theatreScreens = this.screens.filter(s => s.theatreId === theatre.id);
    if (this.theatreScreens.length > 0) {
        this.selectScreen(0);
    }
    this.currentView = 'screens';
  }
  
  backToTheatres() {
    this.selectedTheatre = null;
    this.currentView = 'theatres';
  }

  deleteTheatre(theatreId: string, event: Event) {
    event.stopPropagation();
    
    const screensForTheatre = this.screens.filter(s => s.theatreId === theatreId);
    const screenIds = screensForTheatre.map(s => s.id);
    
    this.movieService.getAllMovies().subscribe(
      (movies) => {
        let hasActiveMovie = false;
        
        for (let movie of movies) {
            if (movie.selectedScreenId && screenIds.includes(movie.selectedScreenId)) {
                const status = this.getMovieStatus(movie);
                if (status === 'Now Showing' || status === 'Upcoming') {
                    hasActiveMovie = true;
                    break;
                }
            }
        }
        
        if (hasActiveMovie) {
           alert('Cannot delete this theatre. There are active movies (Upcoming or Now Showing) scheduled here.');
           return;
        }
        
        if(confirm('Are you sure you want to delete this theatre? All associated screens and layouts will be deleted.')) {
          // Delete all screens first, then theatre
          let deleteObservables = screenIds.map(id => this.screenService.deleteScreen(id));
          
          if(deleteObservables.length > 0) {
              forkJoin(deleteObservables).subscribe(() => {
                  this.theatreService.deleteTheatre(theatreId).subscribe(() => {
                      this.loadData();
                  });
              });
          } else {
              this.theatreService.deleteTheatre(theatreId).subscribe(() => {
                  this.loadData();
              });
          }
        }
      },
      (error) => {
         console.error('Error checking movies', error);
         alert('Failed to verify theatre dependencies. Please try again.');
      }
    );
  }

  getMovieStatus(extras: any): string {
    if (!extras.showDate) return 'Ended';
    
    const movieDate = new Date(extras.showDate);
    if (extras.showTime) {
      const [hours, minutes] = extras.showTime.split(':');
      movieDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    } else {
      movieDate.setHours(23, 59, 59, 999);
    }
    
    const now = new Date();
    
    if (movieDate.toDateString() === now.toDateString()) {
      return 'Now Showing';
    } else if (movieDate > now) {
      return 'Upcoming';
    } else {
      return 'Ended';
    }
  }
  
  get currentScreen(): ScreenConfig | null {
    if (this.theatreScreens.length > 0 && this.selectedScreenIndex < this.theatreScreens.length) {
      return this.theatreScreens[this.selectedScreenIndex];
    }
    return null;
  }

  addNewScreen(name: string = `Screen ${this.theatreScreens.length + 1}`) {
    if (!this.selectedTheatre) return;
    
    let gridData = this.createGrid(10, 12);
    let apiScreen: ApiScreenConfig = {
        theatreId: this.selectedTheatre.id!,
        name: name,
        type: 'Standard',
        capacity: 120,
        grid: JSON.stringify(gridData)
    };
    
    this.screenService.addScreen(apiScreen).subscribe(savedScreen => {
        let uiScreen: ScreenConfig = {
            id: savedScreen.id!,
            theatreId: savedScreen.theatreId,
            name: savedScreen.name,
            type: savedScreen.type,
            rows: 10,
            cols: 12,
            grid: gridData
        };
        this.screens.push(uiScreen);
        this.theatreScreens.push(uiScreen);
        this.selectScreen(this.theatreScreens.length - 1);
    }, error => {
        alert('Failed to add screen.');
    });
  }

  selectScreen(index: number) {
    this.selectedScreenIndex = index;
    if (this.currentScreen) {
      this.inputRows = this.currentScreen.rows;
      this.inputCols = this.currentScreen.cols;
    }
  }

  deleteCurrentScreen() {
    if (this.theatreScreens.length > 1) {
      const screenToDelete = this.theatreScreens[this.selectedScreenIndex];
      this.screenService.deleteScreen(screenToDelete.id).subscribe(() => {
          this.screens = this.screens.filter(s => s.id !== screenToDelete.id);
          this.theatreScreens.splice(this.selectedScreenIndex, 1);
          this.selectScreen(0);
      }, error => {
          alert('Failed to delete screen.');
      });
    } else {
      alert("You must have at least one screen in this theatre.");
    }
  }

  createGrid(rows: number, cols: number): string[][] {
    let grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        let i = (r * cols) + c;
        // Default pattern
        if (i < Math.floor((rows * cols) * 0.2)) row.push('platinum');
        else if (i < Math.floor((rows * cols) * 0.5)) row.push('vip');
        else row.push('standard');
      }
      grid.push(row);
    }
    return grid;
  }

  updateGridSize() {
    if (!this.currentScreen) return;
    
    // Boundary checks
    if (this.inputRows < 1) this.inputRows = 1;
    if (this.inputRows > 30) this.inputRows = 30;
    if (this.inputCols < 1) this.inputCols = 1;
    if (this.inputCols > 40) this.inputCols = 40;

    let newGrid: string[][] = [];
    for (let r = 0; r < this.inputRows; r++) {
      let row = [];
      for (let c = 0; c < this.inputCols; c++) {
        // Try to keep old seat types if they existed
        if (r < this.currentScreen.rows && c < this.currentScreen.cols && this.currentScreen.grid[r] && this.currentScreen.grid[r][c]) {
           row.push(this.currentScreen.grid[r][c]);
        } else {
           row.push('standard'); // default new seats to standard
        }
      }
      newGrid.push(row);
    }
    
    this.currentScreen.rows = this.inputRows;
    this.currentScreen.cols = this.inputCols;
    this.currentScreen.grid = newGrid;
  }

  setTool(tool: string) {
    this.currentTool = tool;
  }

  applyTool(r: number, c: number, event: MouseEvent | null = null) {
    if (!this.currentScreen) return;
    
    // If it's a mouse enter event, only paint if left button is clicked
    if (event && event.type === 'mouseenter' && event.buttons !== 1) {
      return;
    }
    
    if (this.currentTool === 'delete') {
      this.currentScreen.grid[r][c] = 'standard';
    } else {
      this.currentScreen.grid[r][c] = this.currentTool;
    }
  }

  saveLayout() {
    if(this.theatreScreens.length === 0) return;
    
    let observables: Observable<any>[] = [];
    this.theatreScreens.forEach(uiScreen => {
        let apiScreen: ApiScreenConfig = {
            id: uiScreen.id,
            theatreId: uiScreen.theatreId,
            name: uiScreen.name,
            type: uiScreen.type,
            capacity: uiScreen.rows * uiScreen.cols,
            grid: JSON.stringify(uiScreen.grid)
        };
        // Update (assumes POST can upsert or we need a PUT. If backend POST updates by ID, this works. Otherwise we should add a PUT to the backend)
        // Spring Data JPA save() upserts if ID is provided.
        observables.push(this.screenService.addScreen(apiScreen));
    });
    
    if(observables.length > 0) {
        forkJoin(observables).subscribe(() => {
            alert('All screen layouts saved to Database successfully!');
            this.loadData();
        }, error => {
            alert('Failed to save layouts to DB.');
        });
    }
  }

  get standardCount(): number {
    return this.countType('standard');
  }

  get vipCount(): number {
    return this.countType('vip');
  }

  get platinumCount(): number {
    return this.countType('platinum');
  }

  get totalSeats(): number {
    if (!this.currentScreen) return 0;
    return this.currentScreen.rows * this.currentScreen.cols;
  }

  private countType(type: string): number {
    if (!this.currentScreen) return 0;
    let count = 0;
    for (let r = 0; r < this.currentScreen.rows; r++) {
      for (let c = 0; c < this.currentScreen.cols; c++) {
        if (this.currentScreen.grid[r] && this.currentScreen.grid[r][c] === type) count++;
      }
    }
    return count;
  }
}
