package com.example.backend.entity;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "item")
@TypeDefs({
        @TypeDef(name = "json",typeClass = JsonType.class)
})

public class Item {
    @Id
    @Column(name = "item_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int itemID;

    @Column(name = "description", length = 5000 , nullable = false)
    private String description;

    @Column(name = "unit_price", length = 10, nullable = false)
    private double unitPrice;

    @Column(name = "dis_precentage", length = 5 , nullable = false)
    private String disPrecentage;

    @Column(name = "dis_price", length = 10, nullable = false)
    private double disPrice;

    @Column(name = "availability", length = 100, nullable = false)
    private String availability;

    @Type(type = "json")
    @Column(name = "images", columnDefinition = "json", unique = true)
    private ArrayList images;

    @Column(name = "processor", length = 100, nullable = false)
    private String processor;

    @Column(name = "brand", length = 10, nullable = false)
    private String brand;

    @Column(name = "ssd", length = 10, nullable = false)
    private String ssd;

    @Column(name = "ram", length = 10, nullable = false)
    private String ram;

    @Column(name = "screen_size", length = 10, nullable = false)
    private String screenSize;

    @Column(name = "quantity",length = 300, nullable = false)
    private int quantity;

    public Item(String description, double unitPrice, String disPrecentage, double disPrice, String availability, ArrayList images, String processor, String brand, String ssd, String ram, String screenSize,int quantity) {
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
        this.quantity=quantity;
    }
}
