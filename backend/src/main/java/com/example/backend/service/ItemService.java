package com.example.backend.service;

import com.example.backend.DTO.ResponseDTO.ItemDTO;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getItemsBySearch(String searchString);
}
