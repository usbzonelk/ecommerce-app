package com.example.backend.exception;

import io.jsonwebtoken.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SignatureChangeException extends SignatureException {
    public SignatureChangeException(String message) {
        super(message);
    }
}
