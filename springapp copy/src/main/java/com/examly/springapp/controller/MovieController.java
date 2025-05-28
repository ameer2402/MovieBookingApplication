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

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<Movie> addMovie(@RequestBody Movie m) {
        Movie m2 = movieService.addMovie(m);
        return ResponseEntity.status(200).body(m2);
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<Movie> update(@PathVariable Long movieId, @RequestBody Movie m) {
        Movie m2 = movieService.updateMovie(movieId, m);
        if (m2 == null) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.status(200).body(m2);
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        if(movies.isEmpty()){
            return ResponseEntity.status(404).body(Collections.emptyList());
        }
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