package com.example.backend.authentication.impl;

import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.entity.RevokedToken;
import com.example.backend.repo.RevokeTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExistRevokedTokenIMPL implements ExistRevokedToken {
    @Autowired
    private RevokeTokenRepo revokeTokenRepo;

    public boolean checkToken(String token){
        RevokedToken revokedToken = revokeTokenRepo.getToken(token);
        if(revokedToken == null){
            return false;
        }else{
            return true;
        }
    }
}
