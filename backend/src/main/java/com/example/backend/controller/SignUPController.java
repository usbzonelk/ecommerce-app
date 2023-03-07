package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.service.SignUpService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/sign-up")
public class SignUPController {
    @Autowired
    private SignUpService signUpService;
    @PutMapping(path = "/sign-user")
    public ResponseEntity<StandardResponse> signUP(@RequestBody UserRegRequestDTO userRegRequestDTO){
        String text = signUpService.regUser(userRegRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                201,
                                "LOOK Sign Up / Sign In state  !!",
                                text
                        ), HttpStatus.CREATED);
    }
}
