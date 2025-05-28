package com.examly.springapp.exception;

public class MovieNotFoundException extends RuntimeException{
    public MovieNotFoundException(String m){
        super(m);
    }
}
