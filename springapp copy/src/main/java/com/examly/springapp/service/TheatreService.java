package com.examly.springapp.service;

import java.util.List;
import com.examly.springapp.entity.Theatre;

public interface TheatreService {
    Theatre addTheatre(Theatre theatre);
    List<Theatre> getAllTheatres();
    Theatre getTheatreById(String id);
    void deleteTheatre(String id);
}
