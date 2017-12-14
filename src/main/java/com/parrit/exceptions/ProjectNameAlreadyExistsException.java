package com.parrit.exceptions;

public class ProjectNameAlreadyExistsException extends RuntimeException {

    public ProjectNameAlreadyExistsException(String message) {
        super(message);
    }

}
