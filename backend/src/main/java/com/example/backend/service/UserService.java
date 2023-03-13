package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

public interface UserService {

    String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO);

    String addToCart(AddToCartRequestDTO addToCartRequestDTO) throws SQLIntegrityConstraintViolationException;
}
