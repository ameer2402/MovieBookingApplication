package com.examly.springapp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.examly.springapp.entity.Movie;
import com.examly.springapp.entity.ScreenConfig;
import com.examly.springapp.entity.Theatre;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.MovieRepo;
import com.examly.springapp.repository.ScreenConfigRepo;
import com.examly.springapp.repository.TheatreRepo;
import com.examly.springapp.repository.UserRepo;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TheatreRepo theatreRepo;

    @Autowired
    private ScreenConfigRepo screenConfigRepo;

    @Autowired
    private MovieRepo movieRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed Users
        if (userRepo.count() == 0) {
            User admin = new User(0, "admin@test.com", passwordEncoder.encode("admin123"), "admin", "1234567890", "ADMIN");
            userRepo.save(admin);
            
            User user = new User(0, "user@test.com", passwordEncoder.encode("user123"), "user", "0987654321", "USER");
            userRepo.save(user);
        }

        // Seed Theatre
        if (theatreRepo.count() == 0) {
            Theatre theatre = new Theatre("T1", "CinePrestige Flagship", "New York");
            theatreRepo.save(theatre);
        }

        // Seed Screen
        if (screenConfigRepo.count() == 0) {
            ScreenConfig screen = new ScreenConfig("S1", "T1", "IMAX Screen 1", "IMAX", 100, "");
            screenConfigRepo.save(screen);
        }

        // Seed Movies
        if (movieRepo.count() == 0) {
            Movie movie1 = new Movie(0, "Inception", 148, "Sci-Fi, Action", 15, 100, 
                "2026-06-01", "18:00", 4.8, 1000, "EN", "S1", 
                "https://image.tmdb.org/t/p/w500/9gk7adZA2822eVXgeORNWiWGc3Z.jpg", "", "");
                
            Movie movie2 = new Movie(0, "The Dark Knight", 152, "Action, Crime", 15, 100, 
                "2026-06-02", "20:00", 4.9, 2000, "EN", "S1", 
                "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "", "");
                
            movieRepo.save(movie1);
            movieRepo.save(movie2);
        }
    }
}
