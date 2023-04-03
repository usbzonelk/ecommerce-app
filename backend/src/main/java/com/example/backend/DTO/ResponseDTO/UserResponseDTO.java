package com.example.backend.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponseDTO {
    private int customerId;
    private String customerName;
    private ArrayList contactNumber;
}
