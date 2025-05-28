package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.entity.Booking;
@Repository
public interface BookingRepo extends JpaRepository<Booking,Long>{
    @Query("SELECT COALESCE(SUM(b.seatCount),0) FROM Booking b WHERE b.movie.id = :movieId")
    int countBookedSeatsByMovie(@Param("movieId") Long movieId);
    List<Booking> findByMovieId(Long movieid);
    @Query("SELECT b FROM Booking b WHERE b.user.userId =:userId")
    List<Booking> findByUser(@Param("userId") int userId);

}
