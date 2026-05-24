import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { UserStoreService } from '../helpers/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:8080/api/user";

  constructor(private http:HttpClient,private userStore:UserStoreService) {
   }

  register(user:User):Observable<User>{
    return this.http.post<User>(this.baseUrl+"/register",user).pipe(
      tap(registeredUser=>{
        console.log("User registered successfully",registeredUser);
      })
    );
  }
  login(credentials:Login):Observable<User>{
    return this.http.post<User>(this.baseUrl+"/login",credentials);
  }
  logout():void{
    this.userStore.setUser(null);
    }

  isAuthenticated():boolean{
    return this.userStore.isLoggedIn();
    }
  isAdmin():boolean{
    const authUser=this.userStore.authUser;
    return authUser?.role === 'ADMIN';
    }
  getCurrentUserId():number | null{
    const authUser=this.userStore.authUser;
    return authUser ? authUser.userId:null;
    
  }

  getCustomerName():string | null{
    const authUser=this.userStore.authUser;
    return authUser?.userName;
  }


}
