package com.examly.springapp.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Movie;
import com.examly.springapp.service.MovieService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;

    private boolean hasCollision(Movie newMovie) {
        if (newMovie.getSelectedScreenId() == null || newMovie.getShowDate() == null || newMovie.getShowTime() == null) {
            return false;
        }

        List<Movie> existingMovies = movieService.getAllMovies();
        
        long newStartMillis = parseTime(newMovie.getShowDate(), newMovie.getShowTime());
        long newEndMillis = newStartMillis + (newMovie.getDuration() * 60000L);

        for (Movie existing : existingMovies) {
            if (existing.getId() == newMovie.getId()) continue;
            
            if (newMovie.getSelectedScreenId().equals(existing.getSelectedScreenId()) && 
                newMovie.getShowDate().equals(existing.getShowDate())) {
                
                long existingStartMillis = parseTime(existing.getShowDate(), existing.getShowTime());
                long existingEndMillis = existingStartMillis + (existing.getDuration() * 60000L);

                if (newStartMillis < existingEndMillis && existingStartMillis < newEndMillis) {
                    return true;
                }
            }
        }
        return false;
    }

    private long parseTime(String date, String time) {
        try {
            java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
            java.util.Date d = sdf.parse(date + " " + time);
            return d.getTime();
        } catch (Exception e) {
            return 0;
        }
    }

    @PostMapping
    public ResponseEntity<Movie> addMovie(@Valid @RequestBody Movie m) {
        if (hasCollision(m)) {
            throw new IllegalArgumentException("Collision Detected: Screen is already booked during this time.");
        }
        Movie m2 = movieService.addMovie(m);
        return ResponseEntity.status(200).body(m2);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> update(@PathVariable Long movieId, @Valid @RequestBody Movie m) {
        if (hasCollision(m)) {
            throw new IllegalArgumentException("Collision Detected: Screen is already booked during this time.");
        }
        Movie m2 = movieService.updateMovie(movieId, m);
        if (m2 == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(m2);
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long movieId) {
        Movie movie = movieService.getMovieById(movieId);
        if (movie == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(200).body(movie);
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Boolean> deleteById(@PathVariable Long movieId) {
        boolean isDeleted = movieService.deleteMovie(movieId);
        if (!isDeleted) {
            return ResponseEntity.status(404).body(isDeleted);
        }
        return ResponseEntity.status(200).body(isDeleted);
    }
}