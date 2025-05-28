package com.examly.springapp.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.configuration.JwtUtils;
import com.examly.springapp.entity.AuthUser;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtils jwtutils;

    public User add(User user)throws Exception{
        User newUser=userRepo.findByEmail(user.getEmail());
        if(newUser==null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
        }
        throw new Exception("User Already exists");
        
    }
    public List<User> getAll(){
        return userRepo.findAll();

    }
    public AuthUser loginUser(User user) throws Exception{
       Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
       if(authentication.isAuthenticated()){
        List<String> roleList=authentication.getAuthorities().stream().map(r->r.getAuthority()).collect(Collectors.toList());
        String role=roleList.get(0);
        AuthUser authUser=new AuthUser();
        authUser.setUserName(user.getEmail());
        authUser.setJwtToken(jwtutils.generateToken(user.getEmail()));
        authUser.setRole(role);
        authUser.setUserId(userRepo.findIdbyEmail(user.getEmail()));
        authUser.setName(userRepo.findnamebyEmail(user.getEmail()));
        return authUser;
       }
       throw new Exception("Invalid User Name or Password");
    }
}


