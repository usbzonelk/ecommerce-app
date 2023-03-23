package com.example.backend.controller;

import com.example.backend.authentication.Authentication;
import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.LogOutService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/logout")
public class LogOutController {
    @Autowired
    private LogOutService logOutService ;

    @Autowired
    private Authentication authentication;

    @Autowired
    private ExistRevokedToken existRevokedToken ;

    @DeleteMapping(path = "/user")
    ResponseEntity<StandardResponse> logOutUser(@RequestHeader(value = "Authentication") String authenticationHeader) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = logOutService.logOutUser(authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    201,
                                    "LOOK LogOut state  !!",
                                    text
                            ), HttpStatus.CREATED);
        }
    }

    @DeleteMapping(path = "/admin")
    ResponseEntity<StandardResponse> logOutAdmin(@RequestHeader(value = "Authentication") String authenticationHeader) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = logOutService.logOutAdmin(authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    201,
                                    "LOOK LogOut state  !!",
                                    text
                            ), HttpStatus.CREATED);
        }
    }
}
