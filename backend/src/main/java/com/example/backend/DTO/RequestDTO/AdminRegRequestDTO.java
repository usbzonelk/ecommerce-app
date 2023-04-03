package com.example.backend.DTO.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegRequestDTO {
    private String adminName;
    private String email;
    private ArrayList contactNumber;
    private boolean activeState;
    private String  password;
    private String address;
}
