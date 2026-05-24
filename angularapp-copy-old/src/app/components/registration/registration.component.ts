import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService,
    private router: Router) {

  }
  register(form: NgForm): void {
    if (form.valid) {
      const userData: User = new User(
        form.value.email,
        form.value.password,
        form.value.username,
        form.value.mobileNumber,
        form.value.userRole
      );

      this.authService.register(userData).subscribe({
        next: (registeredUser) => {
          this.successMessage = 'Registration successful!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error', err);
        }
      });
    }
  }

}
