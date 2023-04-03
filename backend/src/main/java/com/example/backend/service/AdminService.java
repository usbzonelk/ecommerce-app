package com.example.backend.service;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.ResponseDTO.ResponseCheckOutDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import javassist.NotFoundException;

import java.util.List;

public interface AdminService {

    String addItem(ItemAddRequestDTO itemAddRequestDTO);

    UserResponseDTO getUserUsingID(int id) ;

    String deleteUser(int id,String authenticationHeader);

    String deleteItem(int id);

    String updateQty(ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO);

    String resetPass(AdminPasswordResetRequestDTO adminPasswordResetRequestDTO , String authorizationHeader) ;

    String updatePrivVal(int ID2 , String adminLevel);

    String updateProperties( int adminID,String property,String propertyname );

    String resetEmail(int adminID, String oldEmail, String newEmail , String authenticationHeader);

    List<ResponseCheckOutDTO> getAllCheckoutItems();

    String resetAddress(int adminID, String newAddress, String authenticationHeader);
}
