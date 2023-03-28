package com.example.backend.util.impl;

import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.util.GetID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GetIDs implements GetID {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo ;

    @Override
    public int getUserID(String userEmail){
        return  userRepo.getUserID(userEmail);
    }

    @Override
    public int getAdminID(String adminEmail){
        return  adminRepo.getAdminID(adminEmail);
    }
}
