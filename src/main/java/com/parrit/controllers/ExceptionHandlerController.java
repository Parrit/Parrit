package com.parrit.controllers;

import com.parrit.DTOs.ErrorDTO;
import com.parrit.exceptions.ProjectNameAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleUsernameNotFound(UsernameNotFoundException exception) {
        Map<String, String> fieldErrorMessages = new HashMap<>();
        fieldErrorMessages.put("name", exception.getMessage());

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setFieldErrors(fieldErrorMessages);
        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDTO> handleBadCredentials(BadCredentialsException exception) {
        Map<String, String> fieldErrorMessages = new HashMap<>();
        fieldErrorMessages.put("password", "Polly want a cracker? Try another password.");

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setFieldErrors(fieldErrorMessages);
        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ProjectNameAlreadyExistsException.class)
    public ResponseEntity<ErrorDTO> handleProjectNameAlreadyExists(ProjectNameAlreadyExistsException exception) {
        Map<String, String> fieldErrorMessages = new HashMap<>();
        fieldErrorMessages.put("name", exception.getMessage());

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setFieldErrors(fieldErrorMessages);
        return new ResponseEntity<>(errorDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();

        Map<String, String> fieldErrorMessages = fieldErrors.stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));

        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setFieldErrors(fieldErrorMessages);
        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleException(Exception exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setMessage("Unknown Error.");
        return new ResponseEntity<>(errorDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
