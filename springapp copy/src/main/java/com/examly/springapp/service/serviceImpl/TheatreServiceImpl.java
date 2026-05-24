package com.examly.springapp.service.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Theatre;
import com.examly.springapp.repository.TheatreRepo;
import com.examly.springapp.service.TheatreService;

@Service
public class TheatreServiceImpl implements TheatreService {

    @Autowired
    private TheatreRepo theatreRepo;

    @Override
    public Theatre addTheatre(Theatre theatre) {
        return theatreRepo.save(theatre);
    }

    @Override
    public List<Theatre> getAllTheatres() {
        return theatreRepo.findAll();
    }

    @Override
    public Theatre getTheatreById(String id) {
        return theatreRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteTheatre(String id) {
        theatreRepo.deleteById(id);
    }
}
