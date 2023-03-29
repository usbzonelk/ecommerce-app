package com.example.backend.service.impl;

import com.example.backend.repo.RevokeTokenRepo;
import com.example.backend.repo.TokenRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.LogOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogOutServiceIMPL implements LogOutService {
    @Autowired
    private RevokeTokenRepo revokeTokenRepo;

    @Autowired
    private TokenRepo tokenRepo;

    @Override
    public String logOutUser(String authenticationHeader) {
        revokeTokenRepo.insertToken(authenticationHeader);
        tokenRepo.deleteTokenBytoken(authenticationHeader);
        return "Log Out Successfully!!";
    }

    @Override
    public String logOutAdmin(String authenticationHeader) {
        revokeTokenRepo.insertToken(authenticationHeader);
        tokenRepo.deleteTokenBytoken(authenticationHeader);
        return "Log Out Successfully!!";
    }
}
