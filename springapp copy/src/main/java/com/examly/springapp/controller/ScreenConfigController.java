package com.examly.springapp.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.entity.ScreenConfig;
import com.examly.springapp.service.ScreenConfigService;

@RestController
@RequestMapping("/api/screens")
@CrossOrigin
public class ScreenConfigController {

    @Autowired
    private ScreenConfigService screenService;

    @PostMapping
    public ResponseEntity<ScreenConfig> addScreen(@RequestBody ScreenConfig screen) {
        if (screen.getId() == null || screen.getId().isEmpty()) {
            screen.setId(UUID.randomUUID().toString());
        }
        ScreenConfig saved = screenService.addScreen(screen);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ScreenConfig>> getAllScreens() {
        List<ScreenConfig> list = screenService.getAllScreens();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/theatre/{theatreId}")
    public ResponseEntity<List<ScreenConfig>> getScreensByTheatreId(@PathVariable String theatreId) {
        List<ScreenConfig> list = screenService.getScreensByTheatreId(theatreId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScreenConfig> getScreenById(@PathVariable String id) {
        ScreenConfig screen = screenService.getScreenById(id);
        if (screen != null) {
            return new ResponseEntity<>(screen, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScreen(@PathVariable String id) {
        screenService.deleteScreen(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
