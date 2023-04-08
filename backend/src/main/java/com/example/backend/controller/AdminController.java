package com.example.backend.controller;
import com.example.backend.DTO.RequestDTO.AdminPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.ResponseCheckOutDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authentication.Authentication;
import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.authorization.AdminPrivilage;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.JWTExpireException;
import com.example.backend.exception.NotFoundException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "api/v1/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private Authentication authentication;

    @Autowired
    private ExistRevokedToken existRevokedToken;

    @Autowired
    private AdminPrivilage adminPrivilage;

    @PutMapping(path = "/add-item/{adminID}")
    public ResponseEntity<StandardResponse> addItems(@PathVariable(value = "adminID") int adminID ,
                                                     @RequestBody ItemAddRequestDTO itemAddRequestDTO,
                                                     @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
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

    }

    @GetMapping(path = "/getUserID/{userID}",
                params = {"userID","adminID"})
    public ResponseEntity<StandardResponse> getUserByID(@RequestParam(value = "userID") int userID,
                                                        @RequestParam(value = "adminID") int adminID,
                                                        @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            UserResponseDTO userResponseDTO = adminService.getUserUsingID(userID);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "This is the customer id = " + userID,
                                    userResponseDTO
                            ), HttpStatus.OK);

        }
    }

    @DeleteMapping(path = "/delete-user",
            params = {"userID", "adminID"}
    )
    public ResponseEntity<StandardResponse> removeUSer(@RequestParam(value = "userID") int userid,
                                                       @RequestParam(value = "adminID") int adminid,
                                                       @RequestHeader("Authentication") String authenticationHeader
    ) {
        String adminPrivVal = adminPrivilage.getPrivilleged(adminid);
        if (adminPrivVal.equals("A") || adminPrivVal.equals("B")) {
            if (existRevokedToken.checkToken(authenticationHeader,adminid)) {
                throw new UnauthorizedException("token are deactive");
            } else {
                authentication.authentication(authenticationHeader);
                String text = adminService.deleteUser(userid,authenticationHeader);
                return new ResponseEntity<StandardResponse>(
                        new StandardResponse
                                (
                                        200,
                                        "customer id = " + userid + " deleted!",
                                        text
                                ), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    406,
                                    " not access to delete users for type " + adminPrivVal + " admins",
                                    "HttpStatus.NOT_ACCEPTABLE"
                            ), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @DeleteMapping(path = "/delete-item",
                  params = { "adminID","itemID"}
                  )
    public ResponseEntity<StandardResponse> removeItem(@RequestParam(value = "adminID") int adminid,
                                                       @RequestParam(value = "itemID") int itemID,
                                                       @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminid)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = adminService.deleteItem(itemID);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "item id = " + itemID + " deleted!",
                                    text
                            ), HttpStatus.OK);
        }
    }

    @PutMapping(path = "/update-item-qty",
                params = {"adminID"})
    public ResponseEntity<StandardResponse> updateQty(@RequestParam(value = "adminID") int adminid,
                                                      @RequestBody ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO,
                                                      @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminid)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
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

    @PutMapping(path = "/reset-pass-admin")
    public ResponseEntity<StandardResponse> resetPassword(@RequestBody AdminPasswordResetRequestDTO adminPasswordResetRequestDTO,
                                                          @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminPasswordResetRequestDTO.getId())) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = adminService.resetPass(adminPasswordResetRequestDTO, authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "admin id = " + adminPasswordResetRequestDTO.getId() + "password  update status!",
                                    text
                            ), HttpStatus.OK);
        }

    }

    @PutMapping(path = "/reset-address-admin",
                params = {"adminID","newAddress"})
    public ResponseEntity<StandardResponse> resetAddress(@RequestParam(value = "adminID") int adminID,
                                                         @RequestParam(value = "newAddress")String newAddress,
                                                         @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = adminService.resetAddress(adminID,newAddress,authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "admin id = " + adminID + " Address update status!",
                                    text
                            ), HttpStatus.OK);
        }

    }

    @PutMapping(path = "/reset-email-admin",
                params = {"adminID","newEmail","oldEmail"})
    public ResponseEntity<StandardResponse> resetEmail(@RequestParam(value = "adminID") int adminID ,
                                                       @RequestParam(value = "newEmail" ) String newEmail,
                                                       @RequestParam(value = "oldEmail" ) String oldEmail,
                                                       @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = adminService.resetEmail(adminID,newEmail, oldEmail ,authenticationHeader);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "admin id = " + adminID + " email  update status!",
                                    text
                            ), HttpStatus.OK);
        }

    }

    @PutMapping(path = "/add-previllage",
            params = {"upperLevelAdminID","lowerLevelAdminID", "adminLevel"}
    )
    public ResponseEntity<StandardResponse> updatePrivVal(@RequestParam(value = "upperLevelAdminID") int ID1 ,
                                                          @RequestParam(value = "lowerLevelAdminID") int ID2 ,
                                                          @RequestParam(value = "adminLevel") String adminLevel,
                                                          @RequestHeader(value = "Authentication") String authenticationHeader
                                                         ) {
        String adminPrivVal = adminPrivilage.getPrivilleged(ID1);
        if(adminPrivVal.equals("A")){
            if (existRevokedToken.checkToken(authenticationHeader,ID1)) {
                throw new UnauthorizedException("token are deactive");
            } else {
                authentication.authentication(authenticationHeader);
                String text = adminService.updatePrivVal(ID2 , adminLevel);
                return new ResponseEntity<StandardResponse>(
                        new StandardResponse
                                (
                                        200,
                                        "admin id = " + ID2 + "priviliage value update status!",
                                        text
                                ), HttpStatus.OK);
            }
        }else {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    406,
                                    " not access to delete users for type " + adminPrivVal + " admins",
                                    "HttpStatus.NOT_ACCEPTABLE"
                            ), HttpStatus.NOT_ACCEPTABLE);
        }

    }

    @PutMapping(path = "/modify-properties",
            params = {"propertyname","property", "adminID"}
    )
    public ResponseEntity<StandardResponse> updateProperty(@RequestParam(value = "propertyname") String propertyname ,
                                                          @RequestParam(value = "property") String property ,
                                                          @RequestParam(value = "adminID") int adminID,
                                                          @RequestHeader(value = "Authentication") String authenticationHeader
    ) {
        String adminPrivVal = adminPrivilage.getPrivilleged(adminID);
        try {
            if (adminPrivVal.equals("A")) {
                if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
                    throw new UnauthorizedException("token are deactive");
                } else {
                    authentication.authentication(authenticationHeader);
                    String text = adminService.updateProperties(adminID, property, propertyname);
                    return new ResponseEntity<StandardResponse>(
                            new StandardResponse
                                    (
                                            200,
                                            propertyname + " Update / Insert status",
                                            text
                                    ), HttpStatus.OK);
                }
            }else{
                return new ResponseEntity<StandardResponse>(
                        new StandardResponse
                                (
                                        406,
                                        " not access to delete users for type " + adminPrivVal + " admins",
                                        "HttpStatus.NOT_ACCEPTABLE"
                                ), HttpStatus.NOT_ACCEPTABLE);
            }
        }catch (RuntimeException e){
            throw new NotFoundException("not found suitable admin");
        }
    }

    @GetMapping(path = "/get-All-CheckoutItems/{adminID}")
    public ResponseEntity<StandardResponse> getAllCheckoutItems(@PathVariable(value = "adminID") int adminID,
                                                                @RequestHeader(value = "Authentication") String authenticationHeader) {
        if (existRevokedToken.checkToken(authenticationHeader,adminID)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            List<ResponseCheckOutDTO> responseCheckOutDTOS = adminService.getAllCheckoutItems();
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


