package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.AuthUser;
import com.examly.springapp.entity.User;

public interface UserService {
    User add(User u) throws Exception;
    List<User> getAll();
    AuthUser loginUser(User user)throws Exception;
}
