package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.AdminRequestSignInDTO;
import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;
import com.example.backend.service.SignInService;
import com.example.backend.util.GetID;
import com.example.backend.util.OtpVerify;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path ="api/v1/login")
public class SignInController {
    @Autowired
    private SignInService signInService;

    @Autowired
    private OtpVerify otpVerify ;

    @Autowired
    private GetID getID;

    @PostMapping(path="/user-login")
    public ResponseEntity<StandardResponse> loginUser(@RequestBody UserRequestSignInDTO userRequestSignInDTO){
        if(otpVerify.verificationUserOTP(getID.getUserID(userRequestSignInDTO.getEmail()))){
            String text = signInService.signInUser(userRequestSignInDTO);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    201,
                                    "LOOK Sign Up / Sign In state  !!",
                                    text
                            ), HttpStatus.CREATED);
        }else {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    406,
                                    " User is not still verified his account !!",
                                    " Please verify your account for Sign IN"
                            ), HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping(path="/admin-login")
    public ResponseEntity<StandardResponse> loginAdmin(@RequestBody AdminRequestSignInDTO adminRequestSignInDTO) {
        if (otpVerify.verificationAdminOTP(getID.getAdminID(adminRequestSignInDTO.getEmail()))) {
            String text = signInService.signInAdmin(adminRequestSignInDTO);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    201,
                                    "LOOK Sign Up / Sign In state  !!",
                                    text
                            ), HttpStatus.CREATED);

        } else {
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    406,
                                    " Admin is not still verified his account !!",
                                    " Please verify your account for Sign IN"
                            ), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
