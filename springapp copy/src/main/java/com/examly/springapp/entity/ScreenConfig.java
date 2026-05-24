package com.examly.springapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class ScreenConfig {
    @Id
    private String id;
    private String theatreId;
    private String name;
    private String type;
    private int capacity;

    @Column(columnDefinition = "LONGTEXT")
    private String grid; // JSON string of 2D layout

    public ScreenConfig() {
    }

    public ScreenConfig(String id, String theatreId, String name, String type, int capacity, String grid) {
        this.id = id;
        this.theatreId = theatreId;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.grid = grid;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTheatreId() { return theatreId; }
    public void setTheatreId(String theatreId) { this.theatreId = theatreId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }

    public String getGrid() { return grid; }
    public void setGrid(String grid) { this.grid = grid; }
}
