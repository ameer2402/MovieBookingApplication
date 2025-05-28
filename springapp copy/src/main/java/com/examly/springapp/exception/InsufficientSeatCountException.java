package com.examly.springapp.exception;

public class InsufficientSeatCountException extends RuntimeException{
    public InsufficientSeatCountException(String m){
        super(m);
    }

}
