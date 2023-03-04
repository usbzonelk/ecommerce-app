package com.example.backend.service;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;

public interface AdminService {
    String addAdmin(AdminRegRequestDTO adminRegRequestDTO);
}
