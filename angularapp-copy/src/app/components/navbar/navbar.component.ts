import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLogoutPopup = false;
  isLoggedIn = false;
  userRole: string | null = null;
  username: string = null;
  isScrolled = false;
  isProfileDropdownOpen = false;
  isMobileMenuOpen = false;
  
  private userSubscription: Subscription | null = null;
  
  // Search State
  isSearchActive = false;
  searchQuery = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    private userStore: UserStoreService,
    private eRef: ElementRef,
    private searchService: SearchService
  ) {}

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) {
      this.searchQuery = '';
      this.searchService.updateSearchQuery('');
    }
  }

  onSearchChange() {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileDropdownOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isProfileDropdownOpen = false; // close profile if opening menu
    }
  }

  ngOnInit(): void {
    this.updateUserState();

    this.userSubscription = this.userStore.user$.subscribe(() => {
      this.updateUserState();
    });
  }

  private updateUserState(): void {
    this.isLoggedIn = this.userStore.isLoggedIn();
    this.username = this.userStore.authUser?.userName || 'User'; // Adjust based on model
    this.userRole = this.userStore.authUser?.role || null;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.isProfileDropdownOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}