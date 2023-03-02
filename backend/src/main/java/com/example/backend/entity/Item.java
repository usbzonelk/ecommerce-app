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

    @Column(name = "availability", length = 10, nullable = false)
    private double availability;

    @Type(type = "json")
    @Column(name = "images", columnDefinition = "json", unique = true)
    private ArrayList images;

    @Column(name = "processor", length = 10, nullable = false)
    private double processor;

    @Column(name = "brand", length = 10, nullable = false)
    private double brand;

    @Column(name = "ssd", length = 10, nullable = false)
    private double ssd;

    @Column(name = "ram", length = 10, nullable = false)
    private double ram;

    @Column(name = "screen_size", length = 10, nullable = false)
    private double screenSize;


}
