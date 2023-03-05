package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import javassist.NotFoundException;
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
                userRegRequestDTO.getUserName(),
                userRegRequestDTO.getEmail(),
                userRegRequestDTO.getContactNumber(),
                true,
                userRegRequestDTO.getPassword(),
                userRegRequestDTO.getSalt(),
                userRegRequestDTO.getAddress()
        );
        if(!userRepo.existsById(user.getUserId())){
                userRepo.save(user);
                return user.getUserName()+" is saved " ;
        }else{
            return user.getUserName()+" is already registered " ;
        }
    }

    @Override
    public UserResponseDTO getUserUsingID(int id) throws NotFoundException {
        if(userRepo.existsById(id)){
            User user = userRepo.getById(id);
            UserResponseDTO userResponseDTO = new UserResponseDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getContactNumber()
            );
            return userResponseDTO ;
        }else{
            throw new NotFoundException("User is not found id = " + id);
        }
    }
}
