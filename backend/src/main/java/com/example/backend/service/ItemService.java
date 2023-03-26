package com.example.backend.service;

import com.example.backend.DTO.ResponseDTO.ItemBrandNameResponseDTO;
import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.entity.Item;
import javassist.NotFoundException;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getItemsBySearch(String searchString) throws NotFoundException;

    List<ItemBrandNameResponseDTO> getAllBrandNames();
}
