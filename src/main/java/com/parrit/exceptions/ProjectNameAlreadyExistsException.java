package com.parrit.exceptions;

public class ProjectNameAlreadyExistsException extends RuntimeException {

    private String projectName;

    public ProjectNameAlreadyExistsException(String projectName, String message) {
        super(message);
        this.projectName = projectName;
    }

    public String getProjectName() {
        return projectName;
    }
}
