package com.examly.springapp.service.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Movie;
import com.examly.springapp.repository.MovieRepo;
import com.examly.springapp.service.MovieService;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepo repo;

    @Override
    public Movie addMovie(Movie m) {
        return repo.save(m);
    }

    @Override
    public Movie updateMovie(Long id, Movie m) {
        Movie l = repo.findById(id).orElse(null);
        if (l == null) {
            return null;
        }

        l.setId(id);
        l.setTitle(m.getTitle());
        l.setDuration(m.getDuration());
        l.setGenre(m.getGenre());
        l.setPrice(m.getPrice());
        l.setTotalSeats(m.getTotalSeats());
        return repo.save(l);
    }

    @Override
    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    @Override
    public Movie getMovieById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public boolean deleteMovie(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

}