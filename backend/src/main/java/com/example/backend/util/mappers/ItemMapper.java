package com.example.backend.util.mappers;

import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.DTO.ResponseDTO.ItemResponseDTO;
import com.example.backend.entity.Item;
import org.mapstruct.Mapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import java.util.List;
@Mapper(componentModel = "spring")
public interface ItemMapper {
    List<ItemDTO> DTOtoEntity(List<Item> items);
    List<ItemResponseDTO>  ItemListToDTOList  (List<Item> items);
}
