package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

public interface SignUpService {
    String regUser(UserRegRequestDTO userRegRequestDTO) throws MessagingException;

    String addAdmin(AdminRegRequestDTO adminRegRequestDTO) throws MessagingException;

    String userOTPVerfied(int userID, String otp);

    String adminOTPVerfied(int adminID, String otp);
}
