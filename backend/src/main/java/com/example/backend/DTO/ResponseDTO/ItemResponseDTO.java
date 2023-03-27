package com.example.backend.DTO.ResponseDTO;

import com.example.backend.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDTO {
    private int itemID;
    private double unitPrice;
    private String disPrecentage;
    private double disPrice;
    private ArrayList images;
    private String brand;
}
