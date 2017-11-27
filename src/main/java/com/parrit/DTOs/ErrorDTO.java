package com.parrit.DTOs;

import java.util.Map;

public class ErrorDTO {

    private String message;

    private Map<String, String> fieldErrors;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }

    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ErrorDTO)) return false;

        ErrorDTO errorDTO = (ErrorDTO) o;

        if (getMessage() != null ? !getMessage().equals(errorDTO.getMessage()) : errorDTO.getMessage() != null) return false;
        return getFieldErrors() != null ? getFieldErrors().equals(errorDTO.getFieldErrors()) : errorDTO.getFieldErrors() == null;
    }

}
