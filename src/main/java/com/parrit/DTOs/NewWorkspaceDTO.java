package com.parrit.DTOs;

public class NewWorkspaceDTO {

    private String name;
    private String password;

    public NewWorkspaceDTO() {
    }

    public NewWorkspaceDTO(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
