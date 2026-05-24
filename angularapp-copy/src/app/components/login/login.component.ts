import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { ToastService } from 'src/app/services/toast.service';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string='';
  isAdminView: boolean = false;
  isSubmitting: boolean = false;

  constructor(private authService:AuthService,
    private router:Router,
    private userStore:UserStoreService,
    private toastService: ToastService) {
      
     }

  ngOnInit(): void {

  }

  toggleAdminView(): void {
    this.isAdminView = !this.isAdminView;
    this.errorMessage = ''; // Clear error message on view switch
  }

  login(form:NgForm){
    if(form.valid){
      this.isSubmitting = true;
      const loginData:Login={
        email:form.value.email,
        password:form.value.password
      };
      this.authService.login(loginData).subscribe({
        next:(user:any)=>{
          this.isSubmitting = false;
          this.userStore.setUser(user);
          this.toastService.showSuccess('Login Successful', 'Welcome back!');
          this.redirectBasedOnRole();
        },
        error:(err)=>{
          this.isSubmitting = false;
          this.toastService.showError('Login Failed', 'Invalid credentials or server error.');
          console.log("Login Error",err);
        }
      })

    }
  }
  private redirectBasedOnRole():void{
    console.log(this.userStore.authUser);    
    if(this.userStore.authUser.role ==='ADMIN' || this.userStore.authUser.role === 'THEATRE_OWNER'){
      this.router.navigate(['/admin/dashboard']);
    }
    else {
      this.router.navigate(['/']); // All normal users go to Home
    }
  }

}
