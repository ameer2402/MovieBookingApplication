const movies = [
  {
      title: "Dune: Part Two",
      genre: "Sci-Fi",
      duration: 166,
      price: 250,
      totalSeats: 150,
      showDate: new Date().toISOString().split('T')[0],
      showTime: "18:00",
      rating: 4.8,
      ratingCount: 150,
      posterBase64: "https://image.pollinations.ai/prompt/Dune%20movie%20poster?width=400&height=600&nologo=true"
  },
  {
      title: "Oppenheimer",
      genre: "Drama, History",
      duration: 180,
      price: 300,
      totalSeats: 200,
      showDate: new Date().toISOString().split('T')[0],
      showTime: "14:30",
      rating: 4.9,
      ratingCount: 300,
      posterBase64: "https://image.pollinations.ai/prompt/Oppenheimer%20movie%20poster?width=400&height=600&nologo=true"
  },
  {
      title: "Deadpool & Wolverine",
      genre: "Action, Comedy",
      duration: 128,
      price: 200,
      totalSeats: 120,
      showDate: new Date().toISOString().split('T')[0],
      showTime: "20:00",
      rating: 4.5,
      ratingCount: 89,
      posterBase64: "https://image.pollinations.ai/prompt/Deadpool%20movie%20poster?width=400&height=600&nologo=true"
  },
  {
      title: "Furiosa: A Mad Max Saga",
      genre: "Action",
      duration: 148,
      price: 220,
      totalSeats: 180,
      showDate: "2026-06-15",
      showTime: "19:00",
      rating: 4.6,
      ratingCount: 45,
      posterBase64: "https://image.pollinations.ai/prompt/Mad%20Max%20movie%20poster?width=400&height=600&nologo=true"
  },
  {
      title: "Interstellar",
      genre: "Sci-Fi",
      duration: 169,
      price: 180,
      totalSeats: 100,
      showDate: new Date(new Date().getTime() - 86400000).toISOString().split('T')[0], // yesterday (ended)
      showTime: "10:00",
      rating: 4.9,
      ratingCount: 500,
      posterBase64: "https://image.pollinations.ai/prompt/Interstellar%20movie%20poster?width=400&height=600&nologo=true"
  }
];

async function seed() {
  console.log("Authenticating as Admin...");
  try {
      const authRes = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "admin@gmail.com", password: "Admin@123" })
      });
      
      if (!authRes.ok) {
          console.error("Login failed. Make sure backend is running and credentials are correct.");
          return;
      }
      
      const user = await authRes.json();
      const token = user.token; // adjust if token property is different
      
      console.log("Logged in successfully. Seeding movies...");
      
      // Need a node environment with localStorage to simulate frontend logic?
      // No, we can't write to the browser's localStorage from a Node script!
      console.warn("WARNING: This script will seed the BACKEND database.");
      console.warn("To fully simulate the UI (ratings, posters, times), those are stored in LocalStorage on the browser.");
      console.warn("You will still need to 'edit' or 'add' movies in the browser UI to set their posters unless we use a browser automation script.");
      
      for (const m of movies) {
          const payload = {
              title: m.title,
              genre: m.genre,
              duration: m.duration,
              price: m.price,
              totalSeats: m.totalSeats
          };
          
          const movieRes = await fetch("http://localhost:8080/api/movie", {
              method: "POST",
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token
              },
              body: JSON.stringify(payload)
          });
          
          if (movieRes.ok) {
              const createdMovie = await movieRes.json();
              console.log(`Created: ${createdMovie.title}`);
          } else {
              console.error(`Failed to create ${m.title}`);
          }
      }
      
      console.log("Done.");
  } catch (err) {
      console.error(err);
  }
}

seed();
