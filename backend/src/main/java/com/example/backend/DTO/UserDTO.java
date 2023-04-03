package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private int userId;
    private String userName;
    private String email;
    private ArrayList contactNumber;
    private boolean activeState;
    private String password;
    private String salt;
    private String address;
}
