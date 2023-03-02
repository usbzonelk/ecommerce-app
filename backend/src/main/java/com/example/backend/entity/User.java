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
@Table(name = "user")
@TypeDefs({
        @TypeDef(name = "json",typeClass = JsonType.class)
})
public class User {
    @Id
    @Column(name = "user_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int customerId;


    @Column(name = "user_name", length = 56)
    private String customerName;

    @Column(name = "email", length = 10, nullable = false)
    private double customerSalarry;

    @Type(type = "json")
    @Column(name = "contact_number", columnDefinition = "json", unique = true)
    private ArrayList contactNumber;


    @Column(name = "active_state", columnDefinition = "TINYINT default 1")
    private boolean activeState;

    @Column(name = "password", nullable = false , length = 200)
    private boolean password;

    @Column(name = "salt", nullable = false , length = 200)
    private boolean salt;

    @Column(name = "address", nullable = false , length = 200)
    private boolean address;


    public User(String customerName, double customerSalarry, ArrayList contactNumber, boolean activeState) {
        this.customerName = customerName;
        this.customerSalarry = customerSalarry;
        this.contactNumber = contactNumber;
        this.activeState = activeState;
    }
}