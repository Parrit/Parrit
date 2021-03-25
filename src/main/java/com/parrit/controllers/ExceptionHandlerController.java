package com.parrit.controllers;

import com.parrit.DTOs.ErrorDTO;
import com.parrit.exceptions.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import static java.util.stream.Collectors.toMap;

@RestControllerAdvice
public class ExceptionHandlerController {

    private static final Logger log = LoggerFactory.getLogger(ExceptionHandlerController.class);

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleUsernameNotFound(UsernameNotFoundException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("name", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDTO> handleBadCredentials(BadCredentialsException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("password", "Polly want a cracker? Try another password."))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ProjectNameAlreadyExistsException.class)
    public ResponseEntity<ErrorDTO> handleProjectNameAlreadyExists(ProjectNameAlreadyExistsException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("name", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(PairingBoardNotFoundException.class)
    public ResponseEntity<ErrorDTO> handlePairingBoardNotFound(PairingBoardNotFoundException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("id", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PairingBoardPositionNotFoundException.class)
    public ResponseEntity<ErrorDTO> handlePairingBoardPositionNotFound(PairingBoardPositionNotFoundException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("pairingBoardId", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleRoleNotFound(RoleNotFoundException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("id", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PersonNotFoundException.class)
    public ResponseEntity<ErrorDTO> handlePersonNotFound(PersonNotFoundException exception) {
        ErrorDTO errorDTO = ErrorDTO.builder()
                .fieldErrors(Map.of("id", exception.getMessage()))
                .build();

        return new ResponseEntity<>(errorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();

        Map<String, String> fieldErrorMessages = fieldErrors.stream()
                .collect(toMap(FieldError::getField, fieldError -> Objects.requireNonNullElse(fieldError.getDefaultMessage(), "")));

        ErrorDTO errorDTO = ErrorDTO.builder().fieldErrors(fieldErrorMessages).build();
        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleException(Exception exception) {
        log.error("Uncaught exception...", exception);

        ErrorDTO errorDTO = ErrorDTO.builder().message("Unknown Error.").build();
        return new ResponseEntity<>(errorDTO, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
