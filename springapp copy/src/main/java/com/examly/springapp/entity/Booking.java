package com.examly.springapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int seatCount;
    private double totalCost;
    @ManyToOne
    @JoinColumn(name="movieId" , nullable=false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "userId",nullable=false)
    private User user;

    public Booking() {
    }

    public Booking(Long id, int seatCount, double totalCost, Movie movie, User user) {
        this.id = id;
        this.seatCount = seatCount;
        this.totalCost = totalCost;
        this.movie = movie;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSeatCount() {
        return seatCount;
    }

    public void setSeatCount(int seatCount) {
        this.seatCount = seatCount;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    


}
