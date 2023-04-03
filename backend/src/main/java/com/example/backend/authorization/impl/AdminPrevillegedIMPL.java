package com.example.backend.authorization.impl;

import com.example.backend.authorization.AdminPrivilage;
import com.example.backend.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminPrevillegedIMPL implements AdminPrivilage {
    @Autowired
    private AdminRepo adminRepo;
    public String getPrivilleged(int adminID){
        return adminRepo.getPrivilageVal(adminID);
    }
}
