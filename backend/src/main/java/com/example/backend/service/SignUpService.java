package com.example.backend.service;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface SignUpService {
    String regUser(UserRegRequestDTO userRegRequestDTO);
}
