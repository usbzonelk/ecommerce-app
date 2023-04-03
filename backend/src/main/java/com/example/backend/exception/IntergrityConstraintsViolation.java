package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
@ResponseStatus(value =HttpStatus.BAD_GATEWAY)
public class IntergrityConstraintsViolation extends RuntimeException {
    public IntergrityConstraintsViolation(String message){
        super(message);
    }

}
