package com.example.backend.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemDTO {
    private int itemID;
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
    private String title;
    private int quantity;

    public ItemDTO(String description, double unitPrice, String disPrecentage, double disPrice, String availability, ArrayList images, String processor, String brand, String ssd, String ram, String screenSize, String title, int quantity) {
        this.description = description;
        this.unitPrice = unitPrice;
        this.disPrecentage = disPrecentage;
        this.disPrice = disPrice;
        this.availability = availability;
        this.images = images;
        this.processor = processor;
        this.brand = brand;
        this.ssd = ssd;
        this.ram = ram;
        this.screenSize = screenSize;
        this.title = title;
        this.quantity = quantity;
    }
}
