package com.example.backend.controller;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authorization.Authorization;
import com.example.backend.authorization.AuthorizationIMPL;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.service.ItemService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.StandardResponse;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

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
      authorization.authorization(authorizationHeader);
      try {
          String text = adminService.addItem(itemAddRequestDTO);
          return new ResponseEntity<StandardResponse>(
                  new StandardResponse
                          (
                                  201,
                                  "Added successfully !!",
                                  text
                          ), HttpStatus.CREATED);

      } catch (RuntimeException e) {
          if (e instanceof RuntimeException) {
              throw new IntergrityConstraintsViolation("");
          } else if (e instanceof UnauthorizedException) {
              throw new UnauthorizedException("");
          }

      }
      return new ResponseEntity<>(
              new StandardResponse(
                      500,
                      "Unexpected error occurred.",
                      ""
              ), HttpStatus.INTERNAL_SERVER_ERROR);
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
    @DeleteMapping(path = "/delete-user/{id}")
    public ResponseEntity<StandardResponse> removeUSer(@PathVariable(value = "id")int id , @RequestHeader("Authorization") String authorizationHeader){
      authorization.authorization(authorizationHeader);
      String text = adminService.deleteUser(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "customer id = " + id + " deleted!",
                                text
                        ), HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete-item/{id}")
    public ResponseEntity<StandardResponse> removeItem(@PathVariable(value = "id") int id , @RequestHeader("Authorization")String authorizationHeader){
        authorization.authorization(authorizationHeader);
        String text = adminService.deleteItem(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "customer id = " + id + " deleted!",
                                text
                        ), HttpStatus.OK);
    }

    @PutMapping(path = "/update-item-qty")
    public ResponseEntity<StandardResponse> updateQty(@RequestBody ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO, @RequestHeader("Authorization") String authorizationHeader){
        authorization.authorization(authorizationHeader);
        String text = adminService.updateQty(itemQTYUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "item id = " + itemQTYUpdateRequestDTO.getId() + " updated successfully!",
                                text
                        ), HttpStatus.OK);
    }



}
