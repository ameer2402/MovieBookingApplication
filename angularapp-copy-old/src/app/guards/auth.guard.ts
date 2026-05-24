import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../helpers/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService,
    private router: Router,private userStore:UserStoreService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userStore.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
      }
      const requiredRole=route.data['role'];
      if(requiredRole){
        const userRole=this.userStore.authUser?.role;
        if(requiredRole === 'ADMIN' && userRole !== 'ADMIN'){
          this.router.navigate(['/error']);
          return false;

        }
        if(requiredRole === 'USER' && userRole !== 'USER'){
          this.router.navigate(['/error']);
          return false;
        }

      }
      return true;
  }


}
