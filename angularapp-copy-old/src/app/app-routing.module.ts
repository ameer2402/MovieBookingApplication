import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminaddmovieComponent } from './components/adminaddmovie/adminaddmovie.component';
import { AdminviewbookingComponent } from './components/adminviewbooking/adminviewbooking.component';
import { AdminviewmovieComponent } from './components/adminviewmovie/adminviewmovie.component';
import { UserviewmovieComponent } from './components/userviewmovie/userviewmovie.component';
import { UserviewbookingComponent } from './components/userviewbooking/userviewbooking.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { UserbookingmovieComponent } from './components/userbookingmovie/userbookingmovie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: 'admin/add/newMovies',
    component: AdminaddmovieComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/view/Movies', component: AdminviewmovieComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/view/AllBookings', component: AdminviewbookingComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'user/view/Movies', component: UserviewmovieComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user/view/Mybookings', component: UserviewbookingComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {
    path: 'user/bookMovie/:movieId', component: UserbookingmovieComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  {path:'**',redirectTo:'/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
