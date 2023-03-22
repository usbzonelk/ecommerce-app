package com.example.backend.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItemDTO {

    private int itemID;
    private double unitPrice;
    private float disPrecentage;
    private float qty;
}
