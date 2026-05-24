package com.examly.springapp.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.entity.Theatre;
import com.examly.springapp.service.TheatreService;

@RestController
@RequestMapping("/api/theatres")
@CrossOrigin
public class TheatreController {

    @Autowired
    private TheatreService theatreService;

    @PostMapping
    public ResponseEntity<Theatre> addTheatre(@RequestBody Theatre theatre) {
        if (theatre.getId() == null || theatre.getId().isEmpty()) {
            theatre.setId(UUID.randomUUID().toString());
        }
        Theatre saved = theatreService.addTheatre(theatre);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Theatre>> getAllTheatres() {
        List<Theatre> list = theatreService.getAllTheatres();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theatre> getTheatreById(@PathVariable String id) {
        Theatre theatre = theatreService.getTheatreById(id);
        if (theatre != null) {
            return new ResponseEntity<>(theatre, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTheatre(@PathVariable String id) {
        theatreService.deleteTheatre(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
