package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/user")

public class UserController {
    @Autowired
    private UserService userService;
    @PutMapping(path = "/regUser")
    public ResponseEntity<StandardResponse> saveUser(@RequestBody UserRegRequestDTO userRegRequestDTO){
        String text = userService.regUser(userRegRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                201,
                                "Saved successfully !!",
                                text
                        ), HttpStatus.CREATED);
    }



}
