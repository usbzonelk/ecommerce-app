package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cart")
@Entity
public class Cart {
    @Id
    @Column(name = "cart_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int cartID;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    private Item item;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "UnitPrice")
    private float unitPrice;

    @Column(name = "DiscountPercentage")
    private float discountPercentage;

}



