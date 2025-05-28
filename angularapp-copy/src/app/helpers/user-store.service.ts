import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  
  user$: Observable<AuthUser | null> = this.userSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      this.setUser(JSON.parse(storedUser));
    }
  }

  setUser(user: AuthUser | null): void {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
    
    this.userSubject.next(user);
  }

  get authUser(): AuthUser | null {
    return this.userSubject.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.authUser;
  }
}