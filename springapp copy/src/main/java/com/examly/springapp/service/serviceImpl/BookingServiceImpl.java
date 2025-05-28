package com.examly.springapp.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.entity.User;
import com.examly.springapp.entity.Booking;
import com.examly.springapp.entity.Movie;
import com.examly.springapp.exception.BookingNotFoundException;
import com.examly.springapp.exception.MovieNotFoundException;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.repository.BookingRepo;
import com.examly.springapp.repository.MovieRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private MovieRepo movieRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public Booking createBooking(int userId, Long movieId, Booking booking) {
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new MovieNotFoundException("Movie Not FOund"));

        int totalBookedSeats = bookingRepo.countBookedSeatsByMovie(movieId);
        if ((totalBookedSeats + booking.getSeatCount()) > movie.getTotalSeats()) {
            throw new BookingNotFoundException(
                    "Insufficient seats available" +
                            "Requested:" + booking.getSeatCount() + "," +
                            "Available:" + (movie.getTotalSeats() - totalBookedSeats));
        }
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user not found"));

        booking.setUser(user);
        booking.setMovie(movie);

        return bookingRepo.save(booking);

    }

    @Override
    public Booking getBookingById(Long bookingId) {
        return bookingRepo.findById(bookingId).orElse(null);
    }

    @Override
    public boolean deleteBooking(Long bookingId) {
        if (bookingRepo.existsById(bookingId)) {
            bookingRepo.deleteById(bookingId);
            return true;
        }
        return false;
    }

    @Override
    public List<Booking> getBookingbyMovie(Long movieId) {
        return bookingRepo.findByMovieId(movieId);

    }

    @Override
    public List<Booking> getBookingByUserId(int userId) {
        return bookingRepo.findByUser(userId);
    }

    @Override
    public List<Booking> getAllBookings() {
       return bookingRepo.findAll();
    }

}
