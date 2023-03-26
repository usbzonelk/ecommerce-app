package com.example.backend.util.impl;

import com.example.backend.repo.UserRepo;
import com.example.backend.util.OtpVerify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpVerification implements OtpVerify {
    @Autowired
    private UserRepo userRepo;

    public boolean verificationOTP(String otp , int userID){
        if(userRepo.getVerifiedState(userID)){
            return true;
        }else{
            return false;
        }
    }
}