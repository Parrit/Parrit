package com.parrit.exceptions;

public class PersonNotFoundException extends RuntimeException {

    public PersonNotFoundException(String msg) {
        super(msg);
    }
}
