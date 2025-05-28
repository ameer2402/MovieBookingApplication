package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Booking;

public interface BookingService {
    Booking createBooking(int userId,Long movieId,Booking booking);
    Booking getBookingById(Long bookingId);
    boolean deleteBooking(Long bookingId);
    List<Booking> getBookingbyMovie(Long movieId);
    List<Booking> getBookingByUserId(int userId);
    List<Booking> getAllBookings();

}
