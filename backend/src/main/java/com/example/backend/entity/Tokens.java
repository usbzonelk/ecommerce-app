package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "token")
@AllArgsConstructor
@NoArgsConstructor
public class Tokens {
    @Id
    @Column(name = "user/adminID", length = 40)
    private int checkoutID;

    @Column(name = "token",length = 10000 , nullable = false,unique = true)
    private String token;

}
