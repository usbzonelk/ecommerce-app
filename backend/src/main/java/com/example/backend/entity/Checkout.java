package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "checkout")
public class Checkout {
    @Id
    @Column(name = "checkout_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int checkoutID;

    @Column(name = "Quantity")
    private int quantity;

    @Column(name = "UnitPrice")
    private float unitPrice;

    @Column(name = "total_price")
    private double totalPrize;

    @Column(name = "dis_price")
    private double disPrice;

    @Column(name = "user_id")
    private double userID;

    public Checkout(int quantity, float unitPrice, double totalPrize, double disPrice, double userID) {
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrize = totalPrize;
        this.disPrice = disPrice;
        this.userID = userID;
    }
}
