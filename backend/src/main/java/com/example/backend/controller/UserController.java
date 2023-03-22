package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.DTO.ResponseDTO.CartItemDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authorization.Authorization;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/user")

public class UserController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserService userService ;

    @Autowired
    private Authorization authorization;

    @PutMapping(path = "/reset-pass-user")
    public ResponseEntity<StandardResponse> resetPassword(@RequestBody UserPasswordResetRequestDTO userPasswordResetRequestDTO, @RequestHeader(value = "Authorization") String authorizationHeader){
        authorization.authorization(authorizationHeader);
        String text = userService.resetPass(userPasswordResetRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "item id = " + userPasswordResetRequestDTO.getId() + " update status!",
                                text
                        ), HttpStatus.OK);
    }

    @PostMapping(path = "add-cart-customer")
    public ResponseEntity<StandardResponse> addToCart(@RequestBody AddToCartRequestDTO addToCartRequestDTO , @RequestHeader(value = "Authorization") String authorizationHeader)  {
        authorization.authorization(authorizationHeader);
        try {
            String text = userService.addToCart(addToCartRequestDTO);

            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "item id = " + addToCartRequestDTO.getItemId() + " added status!",
                                    text
                            ), HttpStatus.OK);

        }catch (RuntimeException | SQLException e){
            throw new IntergrityConstraintsViolation("integrity constraints violation");
        }
    }

    @DeleteMapping(path = "/delete-order-byId/{order_id}")
    public ResponseEntity<StandardResponse> removeOrderById(@PathVariable(value = "order_id") int id , @RequestHeader(value = "Authorization") String authorizationHeader ){
        authorization.authorization(authorizationHeader);
        String text = userService.removeItemById(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "order id = " + id + " remove state!",
                                text
                        ), HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete-allOrders-byId/{user_id}")
    public ResponseEntity<StandardResponse> removeAllOrderById(@PathVariable(value = "user_id") int id , @RequestHeader(value = "Authorization") String authorizationHeader ){
        authorization.authorization(authorizationHeader);
        String text = userService.removeAllItemById(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "orders remove state!",
                                text
                        ), HttpStatus.OK);
    }
    @GetMapping(path = "/get-All-Cart-Items/{user_id}")
    public ResponseEntity<StandardResponse> getAllCartItems(@PathVariable(value = "user_id") int id , @RequestHeader(value = "Authorization") String authorizationHeader){
        authorization.authorization(authorizationHeader);
        List<CartItemDTO> cartItemDTOs = userService.getAllCartItems(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the items which are added by user id = " + id,
                                cartItemDTOs
                        ), HttpStatus.OK);
    }

}

