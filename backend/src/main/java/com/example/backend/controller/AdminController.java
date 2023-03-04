package com.example.backend.controller;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.service.AdminService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/admin")
public class AdminController {
  @Autowired
  private AdminService adminService ;
  @PutMapping(path = "/reg-admin")
    public ResponseEntity<StandardResponse> addAdmins(@RequestBody AdminRegRequestDTO adminRegRequestDTO){
    String text = adminService.addAdmin(adminRegRequestDTO);
    return new ResponseEntity<StandardResponse>(
            new StandardResponse
                    (
                            201,
                            "Saved successfully !!",
                            text
                    ), HttpStatus.CREATED);
  }
}
