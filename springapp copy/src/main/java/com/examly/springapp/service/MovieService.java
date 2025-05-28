package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Movie;

public interface MovieService {
    Movie addMovie(Movie movie);
    Movie updateMovie(Long id,Movie movie);
    List<Movie> getAllMovies();
    Movie getMovieById(Long id);
    boolean deleteMovie(Long id);

}
