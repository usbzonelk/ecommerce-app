package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {

    private int adminId;
    private String adminName;
    private String email;
    private ArrayList contactNumber;
    private boolean activeState;
    private String  password;
    private String salt;
    private String address;
    private String privilage;

}
