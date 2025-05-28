import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string='';

  constructor(private authService:AuthService,
    private router:Router,
    private userStore:UserStoreService) {
      
     }

  ngOnInit(): void {

  }
  login(form:NgForm){
    if(form.valid){
      const loginData:Login={
        email:form.value.email,
        password:form.value.password
      };
      this.authService.login(loginData).subscribe({
        next:(user:any)=>{
          this.userStore.setUser(user);
          console.log(user);
          this.redirectBasedOnRole();
        },
        error:(err)=>{
          this.errorMessage="Invalid Credentials! Please Try Again.";
          console.log("Login Error",err);
        }
      })

    }
  }
  private redirectBasedOnRole():void{
    console.log(this.userStore.authUser);    
    if(this.userStore.authUser.role ==='ADMIN'){
      this.router.navigate(['/admin/view/Movies']);

    }
    else if(this.userStore.authUser.role === 'USER'){
      this.router.navigate(['/user/view/Movies']);
    }
    else{
      this.router.navigate(['/']);
    }
  }

}
