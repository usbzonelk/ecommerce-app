package com.example.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.mail.MessagingException;
@ResponseStatus(value = HttpStatus.EXPECTATION_FAILED)
public class MsgException extends RuntimeException {
    public MsgException(String message){
        super(message);
    }
}
