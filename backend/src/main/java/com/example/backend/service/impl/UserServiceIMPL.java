package com.example.backend.service.impl;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceIMPL implements UserService {

}
