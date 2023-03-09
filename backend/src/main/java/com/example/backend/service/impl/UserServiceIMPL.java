package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
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
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO) {
        if(userRepo.existsById(userPasswordResetRequestDTO.getId())){
            User user = userRepo.getById(userPasswordResetRequestDTO.getId());
            if(bCryptPasswordEncoder.matches(userPasswordResetRequestDTO.getCurrentPass(),user.getSalt())){
                String newSalt = bCryptPasswordEncoder.encode(userPasswordResetRequestDTO.getNewPass());
                userRepo.restPassword(newSalt,userPasswordResetRequestDTO.getId());
                return "password is reset user id = "+userPasswordResetRequestDTO.getId();
            }else{
                return "salt value mismatch !!";
            }
        }else{
            throw new NotFoundException("There is no user for id = "+ userPasswordResetRequestDTO.getId());
        }
    }
}
