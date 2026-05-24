package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.entity.ScreenConfig;
import java.util.List;

@Repository
public interface ScreenConfigRepo extends JpaRepository<ScreenConfig, String> {
    List<ScreenConfig> findByTheatreId(String theatreId);
}
