package com.example.backend.DTO.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminPasswordResetRequestDTO {
        private int id;
        private String currentPass;
        private String newPass;
}
