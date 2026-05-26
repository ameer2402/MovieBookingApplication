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
        // 1. Seed Users (Admins and Users)
        if (userRepo.count() == 0) {
            userRepo.save(new User(0, "superadmin@test.com", passwordEncoder.encode("admin123"), "Super Admin", "9876543210", "ADMIN"));
            userRepo.save(new User(0, "pvr_admin@test.com", passwordEncoder.encode("admin123"), "Theatre Admin", "9876543211", "ADMIN"));
            userRepo.save(new User(0, "user@test.com", passwordEncoder.encode("user123"), "Standard User", "0987654321", "USER"));
        }

        // 2. Seed Theatres (Pan-India)
        if (theatreRepo.count() == 0) {
            theatreRepo.save(new Theatre("T1", "PVR ICON Palladium", "Mumbai, Maharashtra"));
            theatreRepo.save(new Theatre("T2", "INOX Laserplex Nehru Place", "New Delhi, Delhi"));
            theatreRepo.save(new Theatre("T3", "Prasads IMAX", "Hyderabad, Telangana"));
            theatreRepo.save(new Theatre("T4", "SPI Cinemas Sathyam", "Chennai, Tamil Nadu"));
            theatreRepo.save(new Theatre("T5", "Orion Mall PVR", "Bangalore, Karnataka"));
            theatreRepo.save(new Theatre("T6", "PVR Lulu Mall", "Kochi, Kerala"));
            theatreRepo.save(new Theatre("T7", "South City INOX", "Kolkata, West Bengal"));
        }

        // 3. Seed Screens
        if (screenConfigRepo.count() == 0) {
            screenConfigRepo.save(new ScreenConfig("S1", "T1", "PVR Gold Class - Screen 1", "Gold", 100, ""));
            screenConfigRepo.save(new ScreenConfig("S2", "T2", "INOX Insignia - Screen 2", "Insignia", 120, ""));
            screenConfigRepo.save(new ScreenConfig("S3", "T3", "Prasads PCX - Screen 3", "IMAX", 250, ""));
            screenConfigRepo.save(new ScreenConfig("S4", "T4", "Sathyam Main Screen", "Premium", 300, ""));
            screenConfigRepo.save(new ScreenConfig("S5", "T5", "PVR Superplex", "Superplex", 150, ""));
            screenConfigRepo.save(new ScreenConfig("S6", "T6", "PVR Director's Cut", "Director", 80, ""));
            screenConfigRepo.save(new ScreenConfig("S7", "T7", "INOX IMAX", "IMAX", 200, ""));
        }

        // 4. Seed Movies
        if (movieRepo.count() == 0) {
            // Hindi Movies
            movieRepo.save(new Movie(0L, "Jawan", 169, "Action, Thriller", 300, 100, 
                "2026-10-15", "10:30", 4.8, 12500, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Dangal", 161, "Action, Biography, Drama", 250, 100, 
                "2026-10-16", "14:00", 4.9, 15000, "Hindi", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SY500_CR0,0,356,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "3 Idiots", 170, "Comedy, Drama", 200, 120, 
                "2026-10-17", "18:00", 4.9, 21000, "Hindi", "S2", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg", "", ""));

            // Telugu Movies
            movieRepo.save(new Movie(0L, "RRR", 187, "Action, Drama, Epic", 350, 120, 
                "2026-11-01", "21:00", 4.9, 25000, "Telugu, Hindi, Tamil", "S2", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kalki 2898 AD", 180, "Sci-Fi, Mythological", 400, 250, 
                "2026-11-02", "11:30", 4.7, 18000, "Telugu, Hindi", "S3", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/2/22/Kalki_2898_AD_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Bahubali: The Beginning", 159, "Action, Epic", 250, 250, 
                "2026-11-03", "15:30", 4.8, 30000, "Telugu, Hindi", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BODAwMDc0NzA3Ml5BMl5BanBnXkFtZTgwMjU4NzgyNzE@._V1_SY500_CR0,0,353,500_AL_.jpg", "", ""));

            // Tamil Movies
            movieRepo.save(new Movie(0L, "Vikram", 173, "Action, Thriller", 300, 300, 
                "2026-12-10", "14:00", 4.8, 19500, "Tamil, Hindi, Telugu", "S4", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/8b/Vikram_2022_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Leo", 164, "Action, Crime", 350, 300, 
                "2026-12-11", "18:00", 4.7, 22000, "Tamil, Hindi, Telugu", "S4", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/0/07/Leo_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Jailer", 168, "Action, Comedy", 250, 150, 
                "2026-12-12", "21:00", 4.8, 20000, "Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg", "", ""));

            // Kannada Movies
            movieRepo.save(new Movie(0L, "K.G.F: Chapter 2", 168, "Action, Crime", 350, 150, 
                "2026-12-15", "10:30", 4.9, 28000, "Kannada, Hindi, Telugu", "S5", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kantara", 148, "Action, Thriller, Mythological", 200, 80, 
                "2026-12-16", "14:00", 4.9, 15000, "Kannada, Hindi", "S6", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg", "", ""));

            // Malayalam Movies
            movieRepo.save(new Movie(0L, "Premam", 156, "Romance, Comedy", 150, 80, 
                "2026-12-20", "18:00", 4.9, 12000, "Malayalam", "S6", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/9/90/Premam_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Manjummel Boys", 135, "Adventure, Thriller", 200, 200, 
                "2026-12-21", "21:00", 4.8, 16000, "Malayalam", "S7", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/0/09/Manjummel_Boys_poster.jpg", "", ""));

            // Bengali Movies
            movieRepo.save(new Movie(0L, "Aparajito", 138, "Biography, Drama", 150, 200, 
                "2026-12-25", "10:30", 4.7, 5000, "Bengali", "S7", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/b/ba/Aparajito_poster.jpg", "", ""));
        }
    }
}
