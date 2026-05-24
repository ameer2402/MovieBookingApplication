import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

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
  
  private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.updateUserState();

    this.userSubscription = this.userStore.user$.subscribe(() => {
      this.updateUserState();
    });
  }

  private updateUserState(): void {
    this.isLoggedIn = this.userStore.isLoggedIn();
    this.username = this.userStore.authUser?.name;
    this.userRole = this.userStore.authUser?.role || null;
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}