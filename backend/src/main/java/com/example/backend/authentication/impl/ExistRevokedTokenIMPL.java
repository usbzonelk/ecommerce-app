package com.example.backend.authentication.impl;

import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.entity.RevokedToken;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repo.RevokeTokenRepo;
import com.example.backend.repo.TokenRepo;
import jdk.nashorn.internal.parser.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExistRevokedTokenIMPL implements ExistRevokedToken {
    @Autowired
    private RevokeTokenRepo revokeTokenRepo;

    @Autowired
    private TokenRepo tokenRepo ;

    public boolean checkToken(String token , int id){
        RevokedToken revokedToken = revokeTokenRepo.getToken(token);
        String row = tokenRepo.getToken(id);
        if(revokedToken==null && token.equals(row)){
            return false;
        }else{
            return true ;
        }
    }
}
