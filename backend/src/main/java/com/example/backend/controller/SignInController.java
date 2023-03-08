package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.AdminRequestSignInDTO;
import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;
import com.example.backend.service.SignInService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path ="api/v1/login")
public class SignInController {
    @Autowired
    private SignInService signInService;

    @PostMapping(path="/user-login")
    public ResponseEntity<StandardResponse> loginUser(@RequestBody UserRequestSignInDTO userRequestSignInDTO){
        String text = signInService.signInUser(userRequestSignInDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                201,
                                "LOOK Sign Up / Sign In state  !!",
                                text
                        ), HttpStatus.CREATED);
    }
    @PostMapping(path="/admin-login")
    public ResponseEntity<StandardResponse> loginAdmin(@RequestBody AdminRequestSignInDTO adminRequestSignInDTO){
        String text = signInService.signInAdmin(adminRequestSignInDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                201,
                                "LOOK Sign Up / Sign In state  !!",
                                text
                        ), HttpStatus.CREATED);
    }

}
