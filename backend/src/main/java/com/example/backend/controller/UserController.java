package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import javassist.NotFoundException;
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

    @GetMapping (path = "/getUserID/{id}")
    public ResponseEntity<StandardResponse> getUserByID(@PathVariable (value = "id") int id) throws NotFoundException {
        UserResponseDTO userResponseDTO = userService.getUserUsingID(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the customer id = " + id,
                                userResponseDTO
                        ), HttpStatus.OK);
    }



}

