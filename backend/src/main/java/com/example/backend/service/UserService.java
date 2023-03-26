package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.CartItemDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.exception.IntergrityConstraintsViolation;
import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

public interface UserService {

    String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO , String authenticationHeader);

    String addToCart(AddToCartRequestDTO addToCartRequestDTO) throws SQLException;

    String removeItemById(int id);

    String removeAllItemById(int id);

    List<CartItemDTO> getAllCartItems(int id);

    String resetEmail(int userID , String newEmail, String oldEmail , String authorizationHeader) ;

    }
