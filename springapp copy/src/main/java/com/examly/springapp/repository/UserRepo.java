package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.springapp.entity.User;

public interface UserRepo extends JpaRepository<User,Integer>{
    User findByEmailAndPassword(String email, String password);
    
    User findByEmail(String email);
    @Query("SELECT u.userId from User u where u.email =?1")
    int findIdbyEmail(String email);

    @Query("SELECT u.username from User u where u.email =?1")
    String findnamebyEmail(String email);

}
