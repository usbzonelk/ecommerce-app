package com.example.backend.service.impl;

import com.example.backend.repo.RevokeTokenRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.LogOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogOutServiceIMPL implements LogOutService {
    @Autowired
    private RevokeTokenRepo revokeTokenRepo;

    @Override
    public String logOutUser(String authenticationHeader) {
        revokeTokenRepo.insertToken(authenticationHeader);
        return "Log Out Successfully!!";
    }
}
