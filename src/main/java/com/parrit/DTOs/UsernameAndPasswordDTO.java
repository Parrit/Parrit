package com.parrit.DTOs;

public class UsernameAndPasswordDTO {

    private String name;
    private String password;

    public UsernameAndPasswordDTO() {
    }

    public UsernameAndPasswordDTO(String name, String password) {
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
