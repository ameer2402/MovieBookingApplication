package com.examly.springapp.exception;

public class BookingNotFoundException extends RuntimeException{
    public BookingNotFoundException(String m){
        super(m);
    }
}
