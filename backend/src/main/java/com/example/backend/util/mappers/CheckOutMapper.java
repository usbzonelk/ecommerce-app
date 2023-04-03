package com.example.backend.util.mappers;

import com.example.backend.DTO.ResponseDTO.ResponseCheckOutDTO;
import com.example.backend.entity.Checkout;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CheckOutMapper {
    List<ResponseCheckOutDTO> checkoutEntityListtoDTOList (List<Checkout> checkouts);
}
