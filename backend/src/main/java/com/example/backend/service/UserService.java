package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserResponseDTO getUserUsingID(int id) throws NotFoundException;
}
