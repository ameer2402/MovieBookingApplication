package com.examly.springapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Movie;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/welcome")
    public ResponseEntity<String> welcome() {
        return new ResponseEntity<>("Welcome to the Movie Booking Application", HttpStatus.OK);
    }

    @GetMapping("/movie")
    public ResponseEntity<List<Movie>> cinema() {
        List<Movie> list = new ArrayList<>();
        list.add(new Movie(1L, "Inception", 345, "Sci-FI", 3, 3));
        list.add(new Movie(3L, "Prestige", 359, "Action", 3, 3));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
