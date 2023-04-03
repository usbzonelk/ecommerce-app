package com.example.backend.exception;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
public class JWTExpireException extends ExpiredJwtException {
    public JWTExpireException(Header header, Claims claims, String message){
        super(header,claims,message);
    }
}
