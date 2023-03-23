package com.example.backend.controller;
import com.example.backend.DTO.RequestDTO.AdminPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authentication.Authentication;
import com.example.backend.authentication.ExistRevokedToken;
import com.example.backend.authorization.AdminPrivilage;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.JWTExpireException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtils;
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

    @PutMapping(path = "/add-item")
    public ResponseEntity<StandardResponse> addItems(@RequestBody ItemAddRequestDTO itemAddRequestDTO,
                                                     @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
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

    @GetMapping(path = "/getUserID/{id}")
    public ResponseEntity<StandardResponse> getUserByID(@PathVariable(value = "id") int id,
                                                        @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
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

    @DeleteMapping(path = "/delete-user",
            params = {"userID", "adminID"}
    )
    public ResponseEntity<StandardResponse> removeUSer(@RequestParam(value = "userID") int userid,
                                                       @RequestParam(value = "adminID") int adminid,
                                                       @RequestHeader("Authentication") String authenticationHeader
    ) {
        String adminPrivVal = adminPrivilage.getPrivilleged(adminid);
        if (adminPrivVal.equals("A") || adminPrivVal.equals("B")) {
            if (existRevokedToken.checkToken(authenticationHeader)) {
                throw new UnauthorizedException("token are deactive");
            } else {
                authentication.authentication(authenticationHeader);
                String text = adminService.deleteUser(userid);
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

    @DeleteMapping(path = "/delete-item/{id}")
    public ResponseEntity<StandardResponse> removeItem(@PathVariable(value = "id") int id,
                                                       @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
            throw new UnauthorizedException("token are deactive");
        } else {
            authentication.authentication(authenticationHeader);
            String text = adminService.deleteItem(id);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "customer id = " + id + " deleted!",
                                    text
                            ), HttpStatus.OK);
        }
    }

    @PutMapping(path = "/update-item-qty")
    public ResponseEntity<StandardResponse> updateQty(@RequestBody ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO,
                                                      @RequestHeader("Authentication") String authenticationHeader
    ) {
        if (existRevokedToken.checkToken(authenticationHeader)) {
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
        if (existRevokedToken.checkToken(authenticationHeader)) {
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
            if (existRevokedToken.checkToken(authenticationHeader)) {
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

}


