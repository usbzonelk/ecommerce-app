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
@Table(name = "admin")
@TypeDefs({
        @TypeDef(name = "json",typeClass = JsonType.class)
})
public class Admin {
    @Id
    @Column(name = "admin_id", length = 40)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int adminId;


    @Column(name = "admin_name", length = 56)
    private String adminName;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Type(type = "json")
    @Column(name = "contact_number", columnDefinition = "json", unique = true)
    private ArrayList contactNumber;


    @Column(name = "active_state", columnDefinition = "TINYINT default 1")
    private boolean activeState;

    @Column(name = "password", length = 200)
    private String  password;

    @Column(name = "salt", nullable = false , length = 1000)
    private String salt;

    @Column(name = "address", nullable = false , length = 200)
    private String address;

    @Column(name = "privilage",  length = 20)
    private String privilage;

    @Column(name ="otp",length = 6)
    private String otp ;

    @Column(name ="verify_state" ,columnDefinition = "0" )
    private int stateVerification ;

    public Admin(String adminName, String email, ArrayList contactNumber, boolean activeState,String salt, String address , String otp) {
        this.adminName = adminName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.activeState = activeState;
        this.salt = salt;
        this.address = address;
        this.otp = otp;
    }
}