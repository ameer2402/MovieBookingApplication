package com.examly.springapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Movie title is required")
    private String title;
    
    @Min(value = 1, message = "Duration must be at least 1 minute")
    private int duration;
    
    private String genre;
    private int price;
    
    @Min(value = 1, message = "Total seats must be at least 1")
    private int totalSeats;
    
    @NotBlank(message = "Show date is required")
    private String showDate;
    
    @NotBlank(message = "Show time is required")
    private String showTime;
    
    private Double rating;
    private Integer ratingCount;
    private String language;
    
    @NotBlank(message = "A screen must be selected")
    private String selectedScreenId;
    
    @jakarta.persistence.Column(columnDefinition="LONGTEXT")
    private String posterBase64;
    
    @jakarta.persistence.Column(columnDefinition="LONGTEXT")
    private String categoryPrices;
    
    @jakarta.persistence.Column(columnDefinition="LONGTEXT")
    private String blockedSeats;

    public Movie() {
    }

    public Movie(long id, String title, int duration, String genre, int price, int totalSeats, 
                 String showDate, String showTime, Double rating, Integer ratingCount, 
                 String language, String selectedScreenId, String posterBase64,
                 String categoryPrices, String blockedSeats) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.genre = genre;
        this.price = price;
        this.totalSeats = totalSeats;
        this.showDate = showDate;
        this.showTime = showTime;
        this.rating = rating;
        this.ratingCount = ratingCount;
        this.language = language;
        this.selectedScreenId = selectedScreenId;
        this.posterBase64 = posterBase64;
        this.categoryPrices = categoryPrices;
        this.blockedSeats = blockedSeats;
    }
    
    // For backwards compatibility
    public Movie(long id, String title, int duration, String genre, int price, int totalSeats) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.genre = genre;
        this.price = price;
        this.totalSeats = totalSeats;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public String getShowDate() { return showDate; }
    public void setShowDate(String showDate) { this.showDate = showDate; }

    public String getShowTime() { return showTime; }
    public void setShowTime(String showTime) { this.showTime = showTime; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getRatingCount() { return ratingCount; }
    public void setRatingCount(Integer ratingCount) { this.ratingCount = ratingCount; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getSelectedScreenId() { return selectedScreenId; }
    public void setSelectedScreenId(String selectedScreenId) { this.selectedScreenId = selectedScreenId; }

    public String getPosterBase64() { return posterBase64; }
    public void setPosterBase64(String posterBase64) { this.posterBase64 = posterBase64; }

    public String getCategoryPrices() { return categoryPrices; }
    public void setCategoryPrices(String categoryPrices) { this.categoryPrices = categoryPrices; }

    public String getBlockedSeats() { return blockedSeats; }
    public void setBlockedSeats(String blockedSeats) { this.blockedSeats = blockedSeats; }
}
