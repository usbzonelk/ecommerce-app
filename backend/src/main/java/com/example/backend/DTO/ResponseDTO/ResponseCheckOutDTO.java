package com.example.backend.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCheckOutDTO {
    private int checkoutID;
    private int quantity;
    private double totalPrize;
    private double userID;
}
