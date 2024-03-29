package com.example.backend.DTO.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemAddRequestDTO {
    private String description;
    private double unitPrice;
    private String disPrecentage;
    private double disPrice;
    private String availability;
    private ArrayList images;
    private String processor;
    private String brand;
    private String ssd;
    private String ram;
    private String screenSize;
    private int quantity;
    private String title;
}
