package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.repo.AdminRepo;
import com.example.backend.service.AdminService;
import com.example.backend.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceIMPL implements AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Override
    public String addAdmin(AdminRegRequestDTO adminRegRequestDTO) {
        Admin admin = new Admin(
                adminRegRequestDTO.getAdminName(),
                adminRegRequestDTO.getEmail(),
                adminRegRequestDTO.getContactNumber(),
                true,
                adminRegRequestDTO.getPassword(),
                adminRegRequestDTO.getSalt(),
                adminRegRequestDTO.getAddress()
        );
        if(!adminRepo.existsById(admin.getAdminId())){
            adminRepo.save(admin);
            return admin.getAdminName()+" is saved " ;
        }else{
            return admin.getAdminName()+" is already registered " ;
        }
    }
}
