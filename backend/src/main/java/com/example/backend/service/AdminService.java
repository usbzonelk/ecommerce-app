package com.example.backend.service;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import javassist.NotFoundException;

public interface AdminService {

    String addItem(ItemAddRequestDTO itemAddRequestDTO);
    UserResponseDTO getUserUsingID(int id) ;

    String deleteUser(int id);

    String deleteItem(int id);

    String updateQty(ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO);
}
