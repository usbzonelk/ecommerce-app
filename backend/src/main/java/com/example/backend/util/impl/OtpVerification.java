package com.example.backend.util.impl;

import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.util.OtpVerify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpVerification implements OtpVerify {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo ;

    public boolean verificationUserOTP( int userID){
        if(userRepo.getVerifiedState(userID) == 1){
            return true;
        }else{
            return false;
        }
    }

    public boolean verificationAdminOTP( int adminID){
        if(adminRepo.getVerifiedState(adminID) == 1){
            return true;
        }else{
            return false;
        }
    }
}
