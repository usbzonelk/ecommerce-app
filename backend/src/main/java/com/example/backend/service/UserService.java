package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;

public interface UserService {
    String regUser(UserRegRequestDTO userRegRequestDTO);
}
