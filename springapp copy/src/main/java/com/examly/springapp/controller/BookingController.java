package com.examly.springapp.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Booking;
import com.examly.springapp.exception.BookingNotFoundException;
import com.examly.springapp.service.BookingService;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/api/booking")
    public ResponseEntity<List<Booking>> getAll(){
        List<Booking> all=bookingService.getAllBookings();
        if(all.isEmpty()){
            return ResponseEntity.status(404).body(Collections.emptyList());
        }
        else{
            return ResponseEntity.status(200).body(all);
        }
    }

    @PostMapping("/api/booking/{userId}/{movieId}")
    public ResponseEntity<Booking> add(@PathVariable int userId,@PathVariable Long movieId,@RequestBody Booking book){
        Booking book1=bookingService.createBooking(userId,movieId,book);
        return ResponseEntity.status(201).body(book1);

    }
    @GetMapping("/api/booking/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId){
        Booking b=bookingService.getBookingById(bookingId);
        if(b==null){
            throw new BookingNotFoundException("Booking not found");

        }
        return ResponseEntity.status(200).body(b);
    }
    @DeleteMapping("/api/booking/{bookingId}")
    public ResponseEntity<Boolean> del(@PathVariable Long bookingId){
        boolean check=bookingService.deleteBooking(bookingId);
        if(!check){
            throw new BookingNotFoundException("Booking not found");
        }
        return ResponseEntity.status(200).body(check);
    }
    @GetMapping("api/booking/movie/{movieId}")
    public ResponseEntity<List<Booking>> getBookingBymovieId(@PathVariable Long movieId){
        List<Booking> b=bookingService.getBookingbyMovie(movieId);
        if(b.isEmpty()){
            throw new BookingNotFoundException("Booking not found");

        }
        return ResponseEntity.status(200).body(b);
    }
    @GetMapping("api/booking/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingbyUserId(@PathVariable int userId){
        List<Booking> b=bookingService.getBookingByUserId(userId);
        if(b.isEmpty()){
            throw new BookingNotFoundException("Booking not found");

        }
        return ResponseEntity.status(200).body(b);
    }


}
