import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminaddmovieComponent } from './components/adminaddmovie/adminaddmovie.component';
import { AdminviewbookingComponent } from './components/adminviewbooking/adminviewbooking.component';
import { AdminviewmovieComponent } from './components/adminviewmovie/adminviewmovie.component';
import { UserviewbookingComponent } from './components/userviewbooking/userviewbooking.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { UserbookingmovieComponent } from './components/userbookingmovie/userbookingmovie.component';
import { AdminaddownerComponent } from './components/adminaddowner/adminaddowner.component';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AdmintheatreconfigComponent } from './components/admintheatreconfig/admintheatreconfig.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'settings', component: UsersettingsComponent, canActivate: [AuthGuard] },

  {
    path: 'admin/dashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'THEATRE_OWNER'] }
  },
  {
    path: 'admin/theatre-config',
    component: AdmintheatreconfigComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'THEATRE_OWNER'] }
  },
  {
    path: 'admin/add/newMovies',
    component: AdminaddmovieComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'THEATRE_OWNER'] }
  },
  {
    path: 'admin/add/owner',
    component: AdminaddownerComponent,
    canActivate: [AuthGuard],
    data: { roles: ['SUPER_ADMIN'] }
  },
  {
    path: 'admin/view/Movies', component: AdminviewmovieComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'THEATRE_OWNER'] }
  },
  {
    path: 'admin/view/AllBookings', component: AdminviewbookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'THEATRE_OWNER'] }
  },

  {
    path: 'user/view/Mybookings', component: UserviewbookingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'SUPER_ADMIN'] }
  },
  {
    path: 'user/bookMovie/:movieId', component: UserbookingmovieComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'SUPER_ADMIN'] }
  },
  {path:'**',redirectTo:'/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
