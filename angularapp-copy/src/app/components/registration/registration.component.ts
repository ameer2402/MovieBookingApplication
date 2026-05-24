import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  isSubmitting = false;

  constructor(private authService: AuthService,
    private router: Router,
    private toastService: ToastService) {

  }
  register(form: NgForm): void {
    if (form.valid) {
      this.isSubmitting = true;
      
      // Backdoor for Admin testing:
      let userRole = 'USER';
      if (form.value.email.endsWith('@super.cineprestige.com')) {
        userRole = 'SUPER_ADMIN';
      } else if (form.value.email.endsWith('@owner.cineprestige.com')) {
        userRole = 'THEATRE_OWNER';
      } else if (form.value.email.endsWith('@cineprestige.com')) {
        userRole = 'ADMIN';
      }
      
      const userData: User = new User(
        form.value.email,
        form.value.password,
        form.value.username,
        form.value.mobileNumber,
        userRole
      );

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          console.log('Registration successful', response);
          this.toastService.showSuccess('Registration Successful', 'Your account has been created. Please log in.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Registration error', error);
          this.toastService.showError('Registration Failed', 'Could not create account. Email may already be in use.');
        }
      });
    }
  }

}
