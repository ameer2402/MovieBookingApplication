import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css'
})
export class UsersettingsComponent implements OnInit {
  userName: string = '';
  email: string = '';
  role: string = '';
  marketingEmails: boolean = true;

  constructor(private userStore: UserStoreService, private location: Location, private toastService: ToastService) {}

  ngOnInit(): void {
    const user = this.userStore.authUser;
    if (user) {
      this.userName = user.userName;
      this.email = user.userName + '@cinema.com'; // fallback if email not in token
      this.role = user.role;
    }
  }

  saveChanges(): void {
    const user = this.userStore.authUser;
    if (user) {
      // Mock update to local storage to reflect in Navbar immediately
      user.userName = this.userName;
      this.userStore.setUser(user);
      
      this.toastService.showSuccess('Profile Updated', 'Your account settings have been saved successfully.');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
