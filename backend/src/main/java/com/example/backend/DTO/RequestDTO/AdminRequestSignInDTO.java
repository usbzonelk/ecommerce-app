package com.example.backend.DTO.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminRequestSignInDTO {
    private int adminID;
    private String email;
    private String  password;
}
