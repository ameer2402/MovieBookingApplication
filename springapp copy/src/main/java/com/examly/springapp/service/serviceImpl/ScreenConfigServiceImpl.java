package com.examly.springapp.service.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.ScreenConfig;
import com.examly.springapp.repository.ScreenConfigRepo;
import com.examly.springapp.service.ScreenConfigService;

@Service
public class ScreenConfigServiceImpl implements ScreenConfigService {

    @Autowired
    private ScreenConfigRepo screenRepo;

    @Override
    public ScreenConfig addScreen(ScreenConfig screen) {
        return screenRepo.save(screen);
    }

    @Override
    public List<ScreenConfig> getAllScreens() {
        return screenRepo.findAll();
    }

    @Override
    public List<ScreenConfig> getScreensByTheatreId(String theatreId) {
        return screenRepo.findByTheatreId(theatreId);
    }

    @Override
    public ScreenConfig getScreenById(String id) {
        return screenRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteScreen(String id) {
        screenRepo.deleteById(id);
    }
}
