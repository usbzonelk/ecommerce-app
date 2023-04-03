package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "properties")
public class Properties {
    @Id
    @Column(name = "property_id", length = 40)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int propertyID;

    @Column(name = "property_name", nullable = false , unique = true , length = 100)
    private String propertyName ;

    @Column(name = "property" , nullable = false , unique = true ,length = 200)
    private String property ;

    @Column(name = "adminID" , nullable = false , unique = true)
    private int adminID;

}
