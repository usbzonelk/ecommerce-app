package com.example.backend.DTO.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemQTYUpdateRequestDTO {
    private int id;
    private int quantity;
}
