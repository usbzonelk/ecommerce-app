package com.example.backend.controller;

import com.example.backend.DTO.AdminDTO;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.StandardResponse;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.UnavailableException;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/admin")
public class AdminController {
  @Autowired
  private AdminService adminService ;

  @Autowired
  private JwtUtils jwtUtils;

  @PutMapping(path = "/add-item")
  public ResponseEntity<StandardResponse> addItems(@RequestBody ItemAddRequestDTO itemAddRequestDTO , @RequestHeader("Authorization") String authorizationHeader) {
    if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
       String token = authorizationHeader.substring(7);
       Jwts.parser().setSigningKey(jwtUtils.secret).parseClaimsJws(token);
       String text= adminService.addItem(itemAddRequestDTO);
       return new ResponseEntity<StandardResponse>(
              new StandardResponse
                      (
                              201,
                              "Added successfully !!",
                              text
                      ), HttpStatus.CREATED);
    }else {
      throw new UnauthorizedException("Unauthorized accesses!!");
    }
  }

}
