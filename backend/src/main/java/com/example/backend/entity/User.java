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
@Table(name = "customer")
@TypeDefs({
        @TypeDef(name = "json",typeClass = JsonType.class)
})
public class User {
    @Id
    @Column(name = "customer_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int customerId;


    @Column(name = "customer_name", length = 56)
    private String customerName;

    @Column(name = "customer_salary", length = 10, nullable = false)
    private double customerSalarry;

    @Type(type = "json")
    @Column(name = "contact_number", columnDefinition = "json", unique = true)
    private ArrayList contactNumber;

    @Column(name = "active_state", columnDefinition = "TINYINT default 1")
    private boolean activeState;
}