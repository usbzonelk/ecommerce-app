package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

public interface UserService {

    String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO);
}
