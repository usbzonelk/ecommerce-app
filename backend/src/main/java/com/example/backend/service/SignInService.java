package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;

public interface SignInService {
    String signInUser(UserRequestSignInDTO userRequestSignInDTO);
}
