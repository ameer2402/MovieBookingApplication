package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.AuthUser;
import com.examly.springapp.entity.User;
import com.examly.springapp.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> add(@RequestBody User u) throws Exception{
        return ResponseEntity.status(201).body(userService.add(u));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthUser> loginUser(@RequestBody User u) throws Exception{
        return ResponseEntity.status(200).body(userService.loginUser(u));
    }
    @GetMapping
    public ResponseEntity<List<User>> getAll(){
        return ResponseEntity.status(200).body(userService.getAll());   
    }

}
