import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/services/booking.service';
@Component({
  selector: 'app-userviewbooking',
  templateUrl: './userviewbooking.component.html',
  styleUrls: ['./userviewbooking.component.css']
})
export class UserviewbookingComponent implements OnInit {
  bookings:Booking[]=[];
  userId:number;
  errorMessage:string='';

  constructor(private bookingService:BookingService,private userStoreService:UserStoreService) { }

  ngOnInit(): void {
    this.userId=this.userStoreService.authUser?.userId;
    console.log(this.userId);
    this.loadUserBookings();


  }
  loadUserBookings(){
    this.bookingService.getUserBookings(this.userId).subscribe({
      next:(data)=>{
        this.bookings=data;
      },
      error: (error)=>{
        console.log("Error fetching bookings",error);
        this.errorMessage="Failed to load booking history.Plese try again later.";

      }
    })
  }

}
