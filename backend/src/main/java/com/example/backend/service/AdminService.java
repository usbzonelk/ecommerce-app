package com.example.backend.service;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;

public interface AdminService {
    String addAdmin(AdminRegRequestDTO adminRegRequestDTO);

    String addItem(ItemAddRequestDTO itemAddRequestDTO);
}
