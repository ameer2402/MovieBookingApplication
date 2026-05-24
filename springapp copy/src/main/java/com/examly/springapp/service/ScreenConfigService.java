package com.examly.springapp.service;

import java.util.List;
import com.examly.springapp.entity.ScreenConfig;

public interface ScreenConfigService {
    ScreenConfig addScreen(ScreenConfig screen);
    List<ScreenConfig> getAllScreens();
    List<ScreenConfig> getScreensByTheatreId(String theatreId);
    ScreenConfig getScreenById(String id);
    void deleteScreen(String id);
}
