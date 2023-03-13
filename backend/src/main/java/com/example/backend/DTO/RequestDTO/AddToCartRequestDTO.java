package com.example.backend.DTO.RequestDTO;
import com.example.backend.entity.Item;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddToCartRequestDTO {
    private float discountPercentage;
    private int quantity;
    private float unitPrice;
    private int itemId;
    private int userId;

}
