package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.CartItemDTO;
import com.example.backend.DTO.ResponseDTO.ResponseCheckOutDTO;
import com.example.backend.authentication.Authentication;
import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
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
    private Authentication authentication;

    @Autowired
    private ExistRevokedToken existRevokedToken;

    @PutMapping(path = "/reset-pass-user")
    public ResponseEntity<StandardResponse> resetPassword(@RequestBody UserPasswordResetRequestDTO userPasswordResetRequestDTO,
                                                          @RequestHeader(value = "Authentication") String authenticationHeader
                                                         ) {
        if (existRevokedToken.checkToken(authenticationHeader,userPasswordResetRequestDTO.getId())) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.resetPass(userPasswordResetRequestDTO, authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "user id = " + userPasswordResetRequestDTO.getId() + "password  update status!",
                                    text
                            ), HttpStatus.OK);
        }
    }

    @PutMapping(path = "/reset-email-user",
            params = {"userID","newEmail","oldEmail"})
    public ResponseEntity<StandardResponse> resetEmail(@RequestParam(value = "userID") int userID ,
                                                       @RequestParam(value = "newEmail" ) String newEmail,
                                                       @RequestParam(value = "oldEmail" ) String oldEmail,
                                                       @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,userID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.resetEmail(userID,newEmail, oldEmail ,authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "admin id = " + userID + " email  update status!",
                                    text
                            ), HttpStatus.OK);
        }

    }

    @PutMapping(path = "/reset-address-user",
            params = {"userID","newAddress"})
    public ResponseEntity<StandardResponse> resetAddress(@RequestParam(value = "userID") int userID,
                                                         @RequestParam(value = "newAddress")String newAddress,
                                                         @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,userID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.resetAddress(userID,newAddress,authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "User id = " + userID + " Address update status!",
                                    text
                            ), HttpStatus.OK);
        }

    }


    @PostMapping(path = "add-cart-customer")
    public ResponseEntity<StandardResponse> addToCart(@RequestBody AddToCartRequestDTO addToCartRequestDTO ,
                                                      @RequestHeader(value = "Authentication") String authenticationHeader
                                                     ) {
        if (existRevokedToken.checkToken(authenticationHeader,addToCartRequestDTO.getUserId())) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            try {
                String text = userService.addToCart(addToCartRequestDTO);

                return new ResponseEntity<StandardResponse>(
                        new StandardResponse
                                (
                                        200,
                                        "item id = " + addToCartRequestDTO.getItemId() + " added status!",
                                        text
                                ), HttpStatus.OK);

            } catch (RuntimeException | SQLException e) {
                throw new IntergrityConstraintsViolation("integrity constraints violation");
            }
        }
    }

    @DeleteMapping(path = "/delete-order-byId",
                   params = {"orderID","userID"}
                  )
    public ResponseEntity<StandardResponse> removeOrderById(@RequestParam(value = "orderID") int orderID ,
                                                            @RequestParam(value = "userID") int userID,
                                                            @RequestHeader(value = "Authentication") String authenticationHeader
                                                           ) {
        if (existRevokedToken.checkToken(authenticationHeader,userID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.removeItemById(orderID);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "order id = " + orderID + " remove state!",
                                    text
                            ), HttpStatus.OK);
        }
    }

    @DeleteMapping(path = "/delete-allOrders-byId/{user_id}")
    public ResponseEntity<StandardResponse> removeAllOrderById(@PathVariable(value = "user_id") int id ,
                                                               @RequestHeader(value = "Authentication") String authenticationHeader
                                                              ) {
        if (existRevokedToken.checkToken(authenticationHeader,id)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.removeAllItemById(id);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "orders remove state!",
                                    text
                            ), HttpStatus.OK);
        }
    }
    @GetMapping(path = "/get-All-Cart-Items/{user_id}")
    public ResponseEntity<StandardResponse> getAllCartItems(@PathVariable(value = "user_id") int id ,
                                                            @RequestHeader(value = "Authentication") String authenticationHeader
                                                           ) {
        if (existRevokedToken.checkToken(authenticationHeader,id)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
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

    @DeleteMapping(path = "/checkout",
                   params = {"cartID","userID"}
                  )
    public ResponseEntity<StandardResponse> checkout(@RequestParam(value = "cartID") int cartID ,
                                                     @RequestParam(value = "userID") int userID ,
                                                     @RequestHeader(value = "Authentication") String authenticationHeader
                                                    ) {
        if (existRevokedToken.checkToken(authenticationHeader,userID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = userService.checkout(userID,cartID);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "order id = " + cartID + " checkout state!",
                                    text
                            ), HttpStatus.OK);
        }
    }

    @GetMapping(path = "/get-All-CheckoutItems-byUserID/{user_id}")
    public ResponseEntity<StandardResponse> getAllCheckoutItems(@PathVariable(value = "user_id") int userID ,
                                                                @RequestHeader(value = "Authentication") String authenticationHeader
                                                               ) {
        if (existRevokedToken.checkToken(authenticationHeader,userID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            List<ResponseCheckOutDTO> responseCheckOutDTOS = userService.getAllCheckoutItems(userID);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "This is the checkout items ",
                                    responseCheckOutDTOS
                            ), HttpStatus.OK);
        }
    }


}

