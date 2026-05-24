import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminaddowner',
  templateUrl: './adminaddowner.component.html',
  styleUrls: ['./adminaddowner.component.css']
})
export class AdminaddownerComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  addOwner(form: NgForm): void {
    if (form.valid) {
      this.isSubmitting = true;
      // Force role to ADMIN for theatre owners
      const userData: User = new User(
        form.value.email,
        form.value.password,
        form.value.username,
        form.value.mobileNumber,
        "ADMIN" 
      );

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          console.log('Theatre Owner Provisioning successful', response);
          this.toastService.showSuccess('Provisioning Successful', 'The Theatre Owner account has been created.');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Registration error', error);
          this.toastService.showError('Provisioning Failed', 'Could not create account. Email may already be in use.');
        }
      });
    }
  }
}
