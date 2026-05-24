import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = "http://localhost:8080/api/booking";

  constructor(private http:HttpClient) { }

  addBooking(movieId:number,userId:number,booking:Booking):Observable<Booking>{
    return this.http.post<Booking>(this.apiUrl+"/"+userId+"/"+movieId,booking);
  }
  getUserBookings(userId:number):Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl+"/user/"+userId);
  }
  getBookingbyId(bookingId:number):Observable<Booking>{
    return this.http.get<Booking>(this.apiUrl+"/"+bookingId);
  }
  updateBooking(bookingId:number,updateBooking:Booking):Observable<Booking>{
    return this.http.put<Booking>(this.apiUrl+"/"+bookingId,updateBooking);
  }
  getAllBookings():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl);
  }
}
