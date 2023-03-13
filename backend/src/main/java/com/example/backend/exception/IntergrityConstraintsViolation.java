package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.SQLIntegrityConstraintViolationException;
@ResponseStatus(value =HttpStatus.BAD_GATEWAY , reason = "occur integrity constraints violation")
public class IntergrityConstraintsViolation extends SQLIntegrityConstraintViolationException {
    public IntergrityConstraintsViolation(String message){
        super(message);
    }

}
