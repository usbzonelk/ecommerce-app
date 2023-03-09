package com.example.backend.controller;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authorization.Authorization;
import com.example.backend.authorization.AuthorizationIMPL;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.StandardResponse;
import io.jsonwebtoken.*;
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

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserService userService;

  @Autowired
  private Authorization authorization;

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



    @GetMapping (path = "/getUserID/{id}")
    public ResponseEntity<StandardResponse> getUserByID(@PathVariable (value = "id") int id , @RequestHeader("Authorization") String authorizationHeader) {
            authorization.authorization(authorizationHeader);
            UserResponseDTO userResponseDTO = adminService.getUserUsingID(id);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "This is the customer id = " + id,
                                    userResponseDTO
                            ), HttpStatus.OK);

    }
}
