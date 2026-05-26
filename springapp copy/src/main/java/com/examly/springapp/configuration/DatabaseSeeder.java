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
            movieRepo.save(new Movie(0L, "Pathaan", 146, "Action, Thriller", 350, 100, 
                "2026-10-18", "21:00", 4.7, 18000, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "PK", 153, "Comedy, Drama, Sci-Fi", 250, 120, 
                "2026-10-19", "10:30", 4.8, 19000, "Hindi", "S2", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/c3/PK_poster.jpg", "", ""));

            // Telugu Movies
            movieRepo.save(new Movie(0L, "RRR", 187, "Action, Drama, Epic", 350, 120, 
                "2026-11-01", "21:00", 4.9, 25000, "Telugu, Hindi, Tamil", "S2", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Bahubali: The Beginning", 159, "Action, Epic", 250, 250, 
                "2026-11-03", "15:30", 4.8, 30000, "Telugu, Hindi", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BODAwMDc0NzA3Ml5BMl5BanBnXkFtZTgwMjU4NzgyNzE@._V1_SY500_CR0,0,353,500_AL_.jpg", "", ""));
            // Tamil Movies
            movieRepo.save(new Movie(0L, "Jailer", 168, "Action, Comedy", 250, 150, 
                "2026-12-12", "21:00", 4.8, 20000, "Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Master", 179, "Action, Thriller", 300, 150, 
                "2026-12-13", "10:30", 4.7, 18000, "Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/5/53/Master_2021_poster.jpg", "", ""));
            // Kannada Movies
            movieRepo.save(new Movie(0L, "K.G.F: Chapter 2", 168, "Action, Crime", 350, 150, 
                "2026-12-15", "18:00", 4.9, 28000, "Kannada, Hindi, Telugu", "S5", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/d/d0/K.G.F_Chapter_2.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kantara", 148, "Action, Thriller, Mythological", 200, 80, 
                "2026-12-16", "21:00", 4.9, 15000, "Kannada, Hindi", "S6", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/8/84/Kantara_poster.jpeg", "", ""));

            // Malayalam Movies
            // Bengali Movies
            // English (Hollywood in India)
            movieRepo.save(new Movie(0L, "Avengers: Endgame", 181, "Action, Adventure, Sci-Fi", 450, 250, 
                "2026-12-26", "14:00", 4.9, 45000, "English, Hindi", "S3", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Avatar: The Way of Water", 192, "Action, Adventure, Fantasy", 500, 300, 
                "2026-12-27", "18:00", 4.8, 38000, "English, Hindi, Tamil", "S4", 
                "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Dangal", 161, "Action", 255, 217, 
                "2027-01-01", "14:00", 4.3, 24770, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SY500_CR0,0,356,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Gol Maal", 144, "Comedy", 190, 102, 
                "2027-01-03", "14:00", 4.0, 5037, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4OTczODgxNF5BMl5BanBnXkFtZTgwMDAzMTU2NDE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Jaane Bhi Do Yaaro", 132, "Comedy", 250, 152, 
                "2027-01-04", "10:30", 4.7, 5399, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNzQ0MzA3NDY3Nl5BMl5BanBnXkFtZTcwOTAwMzIzMg@@._V1_SY235_CR0,0,177,235_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Chupke Chupke", 127, "Comedy", 310, 171, 
                "2027-01-05", "18:00", 4.0, 12052, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjAzMjMzMzU2N15BMl5BanBnXkFtZTgwMDkxOTE3NDE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "A Wednesday", 104, "Crime", 316, 244, 
                "2027-01-06", "14:00", 3.9, 21340, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzODEzMjE1MTJeQTJeQWpwZ15BbWU3MDE3NjQ5Mzk@._V1_SY492_SX324_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Talvar", 132, "Biography", 207, 185, 
                "2027-01-08", "14:00", 4.2, 13898, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzODg0Mjc4M15BMl5BanBnXkFtZTgwNzY4Mzc3NjE@._V1_SX369_CR0,0,369,499_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Paan Singh Tomar", 135, "Action", 150, 113, 
                "2027-01-09", "18:00", 3.9, 16266, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNTgwODM5OTMzN15BMl5BanBnXkFtZTcwMTA3NzI1Nw@@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Queen", 146, "Adventure", 171, 215, 
                "2027-01-10", "14:00", 3.8, 11257, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1ODUxMzA1Nl5BMl5BanBnXkFtZTgwNDk0NjMyMTE@._V1_SX300_CR0,0,300,433_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Black", 122, "Drama", 340, 218, 
                "2027-01-11", "10:30", 4.3, 10016, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNTI5MmE5M2UtZjIzYS00M2JjLWIwNDItYTY2ZWNiODBmYTBiXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY325_CR0,0,224,325_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Udaan", 134, "Drama", 207, 237, 
                "2027-01-12", "21:00", 4.5, 18248, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNzgxMzExMzUwNV5BMl5BanBnXkFtZTcwMDc2MjUwNA@@._V1_SX300_CR0,0,300,433_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Jo Jeeta Wohi Sikandar", 174, "Comedy", 262, 242, 
                "2027-01-13", "10:30", 3.7, 20823, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNTU1ZjQwNDAtZDAwMC00OTcyLTg4MDUtOTUwYTU4N2M4YTgxXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY500_CR0,0,366,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Gangs of Wasseypur", 320, "Action", 287, 170, 
                "2027-01-14", "21:00", 3.7, 16434, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTgwODM3NzM5MzE@._V1_SY500_CR0,0,337,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Chak De! India", 153, "Drama", 207, 230, 
                "2027-01-15", "10:30", 5.0, 11837, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTM2MjgyNDE5Nl5BMl5BanBnXkFtZTcwMzM1MDc4MQ@@._V1_SY250_CR0,0,166,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Swades: We, the People", 210, "Drama", 293, 167, 
                "2027-01-16", "21:00", 4.8, 19737, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BYzExOTcwNjYtZTljMC00YTQ2LWI2YjYtNWFlYzQ0YTJhNzJmXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY377_CR0,0,261,377_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "OMG: Oh My God!", 125, "Comedy", 277, 191, 
                "2027-01-17", "21:00", 4.9, 10144, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNDk0NDU1NzEwN15BMl5BanBnXkFtZTgwMTgyNTA2NjE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Bhaag Milkha Bhaag", 186, "Action", 242, 146, 
                "2027-01-18", "10:30", 4.0, 5806, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1Nzg4MjcwN15BMl5BanBnXkFtZTcwOTc1NTk1OQ@@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kahaani", 122, "Drama", 189, 136, 
                "2027-01-19", "21:00", 3.9, 6360, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDI0NzkyOF5BMl5BanBnXkFtZTcwNzAyNzE2Nw@@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Shahid", 129, "Biography", 383, 195, 
                "2027-01-20", "10:30", 3.6, 12370, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTYyMDE1NjQ1Nl5BMl5BanBnXkFtZTgwMDAyMTUzMDE@._V1_SY500_CR0,0,374,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Dil Chahta Hai", 183, "Comedy", 394, 220, 
                "2027-01-21", "18:00", 5.0, 17443, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BOTIyODkwNzY2NF5BMl5BanBnXkFtZTgwMzE5NDUzNTE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Satya", 170, "Action", 377, 155, 
                "2027-01-22", "10:30", 3.6, 7322, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwMjk3MzA2OF5BMl5BanBnXkFtZTcwNjU2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "PK", 153, "Comedy", 155, 202, 
                "2027-01-23", "21:00", 3.8, 22162, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_SY500_CR0,0,344,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Lagaan", 224, "Adventure", 179, 138, 
                "2027-01-24", "10:30", 3.7, 12762, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNDYxNWUzZmYtOGQxMC00MTdkLTkxOTctYzkyOGIwNWQxZjhmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY500_CR0,0,333,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Sarfarosh", 174, "Action", 274, 114, 
                "2027-01-25", "21:00", 3.6, 12812, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTgyMDczOTE2M15BMl5BanBnXkFtZTcwMDY2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Omkara", 155, "Action", 294, 192, 
                "2027-01-26", "14:00", 4.5, 8363, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMDU2NjUyOF5BMl5BanBnXkFtZTgwOTc3MDA2MDE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Dilwale Dulhania Le Jayenge", 189, "Comedy", 286, 245, 
                "2027-01-27", "14:00", 4.3, 8746, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNDk3MTU5MDA3OF5BMl5BanBnXkFtZTgwODM3MzY2MzE@._V1_SY500_CR0,0,365,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Zindagi Na Milegi Dobara", 155, "Adventure", 329, 107, 
                "2027-01-28", "18:00", 4.5, 23651, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMzQzMTA4ODY4OF5BMl5BanBnXkFtZTcwNjgyMDQxNw@@._V1_SY500_SX346_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Barfi!", 151, "Adventure", 357, 187, 
                "2027-02-01", "21:00", 4.5, 18862, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQzMTEyODY2Ml5BMl5BanBnXkFtZTgwMjA0MDUyMjE@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Ugly", 128, "Crime", 291, 106, 
                "2027-02-02", "21:00", 4.4, 6729, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNzA0ODUwMzUzNV5BMl5BanBnXkFtZTgwMDA0NTQwMDE@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Haider", 160, "Action", 363, 229, 
                "2027-02-03", "10:30", 3.8, 15739, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1NTEwMDMxMF5BMl5BanBnXkFtZTgwODkzMzI0MjE@._V1_SY500_CR0,0,345,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Deewaar", 174, "Action", 330, 162, 
                "2027-02-04", "14:00", 4.7, 14276, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0NDM4MjYwOV5BMl5BanBnXkFtZTcwMDM3ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Masaan", 109, "Drama", 294, 103, 
                "2027-02-05", "21:00", 4.4, 22658, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4NTE0NTMyNl5BMl5BanBnXkFtZTgwNjI5MDkxNjE@._V1_SY486_SX324_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Athadu", 172, "Action", 389, 176, 
                "2027-02-06", "14:00", 4.8, 16617, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BYTNkMTMyMDEtZDQxYi00ZjBkLTkyYzYtYzdjY2JmYmRmMjBiXkEyXkFqcGdeQXVyNjE3MDAwMDk@._V1_SY353_SX250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Lucia", 135, "Drama", 200, 156, 
                "2027-02-07", "18:00", 3.8, 14319, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQyMDA5ODkzN15BMl5BanBnXkFtZTgwMjIzMDkyMDE@._V1_SY500_CR0,0,342,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Company", 155, "Action", 364, 102, 
                "2027-02-08", "18:00", 4.3, 5191, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMGRkNDJlZmEtZGNhNi00OTRhLWE5NDUtYmMwNGZjMzU0MDk5XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY500_SX346_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Special Chabbis", 144, "Action", 187, 179, 
                "2027-02-09", "18:00", 4.5, 14715, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDI5MjMzNF5BMl5BanBnXkFtZTcwMTc0MDQwOQ@@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Manjhi: The Mountain Man", 120, "Biography", 275, 168, 
                "2027-02-10", "10:30", 4.3, 11537, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjE1NzM3NjkwNl5BMl5BanBnXkFtZTgwMjc1NDUzNjE@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Vaastav: The Reality", 145, "Crime", 227, 169, 
                "2027-02-11", "18:00", 4.8, 21869, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMzE5MTc1OV5BMl5BanBnXkFtZTcwMDk2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Bajrangi Bhaijaan", 163, "Action", 347, 246, 
                "2027-02-12", "21:00", 4.7, 7716, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjE1NjQ5ODc2NV5BMl5BanBnXkFtZTgwOTM5ODIxNjE@._V1_SY500_CR0,0,349,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Ankhon Dekhi", 107, "Comedy", 346, 142, 
                "2027-02-13", "10:30", 4.4, 21854, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1ODMzOTA5MV5BMl5BanBnXkFtZTgwOTA2MTAzMjE@._V1_SY250_CR0,0,171,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Bahubali: The Beginning", 159, "Action", 246, 153, 
                "2027-02-14", "18:00", 4.2, 16492, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BODAwMDc0NzA3Ml5BMl5BanBnXkFtZTgwMjU4NzgyNzE@._V1_SY500_CR0,0,353,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kal Ho Naa Ho", 186, "Comedy", 299, 168, 
                "2027-02-15", "10:30", 4.9, 24107, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxNzU2MDczOV5BMl5BanBnXkFtZTcwNTU5NTk5Mw@@._V1_SY250_SX250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Johnny Gaddaar", 135, "Crime", 294, 113, 
                "2027-02-16", "21:00", 4.3, 5922, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNDE4MmU1YTktMzY1OS00NWQ4LWExZmYtZjI3MzJjNGIxZTcxXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY500_CR0,0,346,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Baby", 159, "Action", 248, 150, 
                "2027-02-17", "10:30", 3.8, 5479, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjAzMDUzMzk0NV5BMl5BanBnXkFtZTgwODczODg4MzE@._V1_SY499_CR0,0,312,499_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Lakshya", 186, "War", 325, 114, 
                "2027-02-18", "21:00", 4.0, 7391, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjM5MzQwNTk4OF5BMl5BanBnXkFtZTgwMDc2MTYzNjE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "My Name Is Khan", 165, "Adventure", 219, 124, 
                "2027-02-19", "18:00", 3.7, 12120, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTUyMTA4NDYzMV5BMl5BanBnXkFtZTcwMjk5MzcxMw@@._V1_SY500_CR0,0,337,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Gangaajal", 157, "Crime", 388, 106, 
                "2027-02-20", "21:00", 4.5, 21245, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BYjRjOWViZTgtYjA4Ny00MWJiLTkxYzktMzdlOGRmMWYwOTdjXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY500_CR0,0,372,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "English Vinglish", 134, "Comedy", 348, 145, 
                "2027-02-21", "10:30", 3.7, 20402, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ5YWVmYmYtOWFiZC00NGMxLWEwODctZDM2MWI4YWViN2E5XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY500_CR0,0,349,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Border", 176, "Action", 286, 213, 
                "2027-02-22", "18:00", 3.7, 21432, "Hindi, Tamil, Telugu", "S1", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BYzZjNzE4MjMtODExYS00MGJhLWJmZDUtMmJkYWZlN2VjNTkzXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY500_CR0,0,335,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Manam", 163, "Comedy", 324, 240, 
                "2027-02-23", "18:00", 4.6, 23684, "Hindi, Tamil, Telugu", "S2", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTYzMjc3NzEzMV5BMl5BanBnXkFtZTgwNzI3NzU4MzE@._V1_SY250_CR0,0,187,250_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Oye Lucky! Lucky Oye!", 125, "Comedy", 378, 124, 
                "2027-02-24", "10:30", 4.3, 18870, "Hindi, Tamil, Telugu", "S3", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BNjA1MjM2NTM3MV5BMl5BanBnXkFtZTcwODIyMjk5MQ@@._V1_SY500_CR0,0,350,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "RangiTaranga", 149, "Adventure", 175, 105, 
                "2027-02-25", "18:00", 4.2, 21796, "Hindi, Tamil, Telugu", "S4", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTAzNjAwNDEwMTNeQTJeQWpwZ15BbWU4MDk5MjMyMzYx._V1_SY499_CR0,0,337,499_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "The Lunchbox", 104, "Drama", 319, 113, 
                "2027-02-26", "21:00", 4.5, 11693, "Hindi, Tamil, Telugu", "S5", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwMzc1NjIzMV5BMl5BanBnXkFtZTgwODUyMTIxMTE@._V1_SY500_CR0,0,339,500_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Kapoor & Sons", 132, "Comedy", 339, 241, 
                "2027-02-27", "18:00", 3.8, 21374, "Hindi, Tamil, Telugu", "S6", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMjE4NDk4MTIwNl5BMl5BanBnXkFtZTgwNDEwODI5NzE@._V1_SY500_SX350_AL_.jpg", "", ""));
            movieRepo.save(new Movie(0L, "Samsara", 145, "Adventure", 179, 127, 
                "2027-02-28", "10:30", 4.8, 17978, "Hindi, Tamil, Telugu", "S7", 
                "https://wsrv.nl/?url=https://images-na.ssl-images-amazon.com/images/M/MV5BMTY2NTY0OTQzOV5BMl5BanBnXkFtZTcwNTQxNDMzMQ@@._V1_SY200_SX139_AL_.jpg", "", ""));
        }
    }
}
