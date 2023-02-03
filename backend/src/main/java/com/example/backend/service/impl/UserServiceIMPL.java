package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Override
    public String regUser(UserRegRequestDTO userRegRequestDTO) {
        User user = new User(
                userRegRequestDTO.getCustomerName(),
                userRegRequestDTO.getCustomerSalarry(),
                userRegRequestDTO.getContactNumber(),
                true
        );
        if(!userRepo.existsById(user.getCustomerId())){
                userRepo.save(user);
                return user.getCustomerName()+" is saved " ;
        }else{
            return user.getCustomerName()+" is already registered " ;
        }
    }
}

