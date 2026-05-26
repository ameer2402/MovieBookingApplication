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
            User superAdmin = new User(0, "superadmin@test.com", passwordEncoder.encode("admin123"), "Super Admin", "9876543210", "ADMIN");
            userRepo.save(superAdmin);
            
            User theatreAdmin = new User(0, "pvr_admin@test.com", passwordEncoder.encode("admin123"), "PVR Admin", "9876543211", "ADMIN");
            userRepo.save(theatreAdmin);
            
            User standardUser = new User(0, "user@test.com", passwordEncoder.encode("user123"), "Standard User", "0987654321", "USER");
            userRepo.save(standardUser);
        }

        // 2. Seed Theatres (Indian Premium Cinemas)
        if (theatreRepo.count() == 0) {
            theatreRepo.save(new Theatre("T1", "PVR ICON Palladium", "Mumbai, Maharashtra"));
            theatreRepo.save(new Theatre("T2", "INOX Laserplex Nehru Place", "New Delhi, Delhi"));
            theatreRepo.save(new Theatre("T3", "Prasads IMAX", "Hyderabad, Telangana"));
        }

        // 3. Seed Screens
        if (screenConfigRepo.count() == 0) {
            screenConfigRepo.save(new ScreenConfig("S1", "T1", "PVR Gold Class - Screen 1", "Gold", 100, ""));
            screenConfigRepo.save(new ScreenConfig("S2", "T2", "INOX Insignia - Screen 2", "Insignia", 120, ""));
            screenConfigRepo.save(new ScreenConfig("S3", "T3", "Prasads PCX - Screen 3", "IMAX", 250, ""));
        }

        // 4. Seed Movies
        if (movieRepo.count() == 0) {
            // Screen 1 Movies (PVR ICON)
            movieRepo.save(new Movie(0L, "Kalki 2898 AD", 180, "Sci-Fi, Action, Mythological", 350, 100, 
                "2026-10-15", "10:30", 4.7, 5200, "Telugu, Hindi", "S1", 
                "https://image.tmdb.org/t/p/w500/x5Zq10LUBXqjV2h6r7hP86l332y.jpg", "", ""));
                
            movieRepo.save(new Movie(0L, "Jawan", 169, "Action, Thriller", 300, 100, 
                "2026-10-16", "14:00", 4.8, 12500, "Hindi, Tamil", "S1", 
                "https://image.tmdb.org/t/p/w500/jILeVkOBEXGUHQIGFAvcFxpzZqT.jpg", "", ""));

            // Screen 2 Movies (INOX Laserplex)
            movieRepo.save(new Movie(0L, "Oppenheimer", 180, "Biography, Drama", 400, 120, 
                "2026-11-01", "18:00", 4.9, 8500, "English", "S2", 
                "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", "", ""));
                
            movieRepo.save(new Movie(0L, "RRR", 187, "Action, Drama, Epic", 350, 120, 
                "2026-11-02", "21:00", 4.9, 15000, "Telugu, Hindi, Tamil", "S2", 
                "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgHO.jpg", "", ""));

            // Screen 3 Movies (Prasads IMAX)
            movieRepo.save(new Movie(0L, "Interstellar", 169, "Sci-Fi, Adventure", 250, 250, 
                "2026-12-10", "11:30", 4.9, 21000, "English", "S3", 
                "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MvrIdZ21.jpg", "", ""));
                
            movieRepo.save(new Movie(0L, "Bahubali: The Conclusion", 167, "Action, Drama", 200, 250, 
                "2026-12-11", "15:30", 4.8, 18500, "Telugu, Hindi", "S3", 
                "https://image.tmdb.org/t/p/w500/91wsQcuwXJb2jM3Zc6xN4s80U8w.jpg", "", ""));
        }
    }
}
