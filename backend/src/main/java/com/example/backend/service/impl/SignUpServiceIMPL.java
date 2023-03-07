package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignUpServiceIMPL implements SignUpService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder ;

    @Override
    public String regUser(UserRegRequestDTO userRegRequestDTO) {
        String msg ;
        String encrptedPassword = bCryptPasswordEncoder.encode(userRegRequestDTO.getPassword());
        User user = new User(
                userRegRequestDTO.getUserName(),
                userRegRequestDTO.getEmail(),
                userRegRequestDTO.getContactNumber(),
                true,
                userRegRequestDTO.getPassword(),
                encrptedPassword,
                userRegRequestDTO.getAddress()
        );

        if(userRepo.existsByUserName(userRegRequestDTO.getUserName())){
            List<String> salts = userRepo.getAllCustomerSalts();
            for (String s : salts) {
                if (bCryptPasswordEncoder.matches(userRegRequestDTO.getPassword(), s)) {
                    msg = "user name = " + userRegRequestDTO.getUserName() + " already sign up ! please sign in ";
                    return msg ;
                }
            }return "password = "+user.getPassword()+" is already exist please enter different user name !! ";
        }

        userRepo.save(user);
        msg = "user name = " + userRegRequestDTO.getUserName() + " is sign up successfully";
        return msg ;
    }
}
