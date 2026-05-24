import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserbookingmovieComponent } from './components/userbookingmovie/userbookingmovie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { AdminaddmovieComponent } from './components/adminaddmovie/adminaddmovie.component';
import { AdminviewbookingComponent } from './components/adminviewbooking/adminviewbooking.component';
import { UserviewmovieComponent } from './components/userviewmovie/userviewmovie.component';
import { AdminviewmovieComponent } from './components/adminviewmovie/adminviewmovie.component';
import { UserviewbookingComponent } from './components/userviewbooking/userviewbooking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    UserbookingmovieComponent,
    NavbarComponent,
    AdminNavComponent,
    UserNavComponent,
    AdminaddmovieComponent,
    AdminviewbookingComponent,
    UserviewmovieComponent,
    AdminaddmovieComponent,
    AdminviewmovieComponent,
    AdminviewbookingComponent,
    UserviewmovieComponent,
    UserviewbookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
