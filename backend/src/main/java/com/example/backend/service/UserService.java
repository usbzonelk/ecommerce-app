package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import javassist.NotFoundException;

public interface UserService {
    String regUser(UserRegRequestDTO userRegRequestDTO);

    UserResponseDTO getUserUsingID(int id) throws NotFoundException;
}
