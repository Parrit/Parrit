package com.parrit.exceptions;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(String msg) { super(msg); }
}
