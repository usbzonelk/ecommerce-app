package com.example.backend.controller;

import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.exception.MsgException;
import com.example.backend.service.SignUpService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "api/v1/sign-up")
public class SignUPController {
    @Autowired
    private SignUpService signUpService;

    @PutMapping(path = "/signUp-user")
    public ResponseEntity<StandardResponse> signUP(@RequestBody UserRegRequestDTO userRegRequestDTO) {
        try
        {String text = signUpService.regUser(userRegRequestDTO);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    201,
                                    "LOOK Sign Up / Sign In state  !!",
                                    text
                            ), HttpStatus.CREATED);
        }catch (MessagingException e){
            throw new MsgException("Email not send");
        }
    }

    @PutMapping(path = "/signUp-admin")
    public ResponseEntity<StandardResponse> signUp(@RequestBody AdminRegRequestDTO adminRegRequestDTO)  {
        try {
            String text = signUpService.addAdmin(adminRegRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                201,
                                "LOOK Sign Up / Sign In state  !!",
                                text
                        ), HttpStatus.CREATED);
    }catch (MessagingException e){
            throw new MsgException("Email not send");
        }
    }

    @PutMapping(path = "otp-verification-user",
                params = {"userID","OTP"}
                )
    public ResponseEntity<StandardResponse> userOTPVerfied(@RequestParam(value = "userID") int userID ,
                                                       @RequestParam(value = "OTP")String OTP){
        String text = signUpService.userOTPVerfied(userID , OTP);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "user id = " + userID + " is  verified status!",
                                text
                        ), HttpStatus.OK);
    }
    @PutMapping(path = "otp-verification-admin",
            params = {"adminID","OTP"}
    )
    public ResponseEntity<StandardResponse> adminOTPVerfied(@RequestParam(value = "adminID") int adminID ,
                                                           @RequestParam(value = "OTP")String OTP){
        String text = signUpService.adminOTPVerfied(adminID , OTP);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "Admin id = " + adminID + " is  verified status!",
                                text
                        ), HttpStatus.OK);
    }
}
