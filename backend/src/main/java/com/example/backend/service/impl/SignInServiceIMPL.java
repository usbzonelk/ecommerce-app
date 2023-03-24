package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.AdminRequestSignInDTO;
import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.User;
import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.SignInService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.OtpVerify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignInServiceIMPL implements SignInService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private OtpVerify otpVerify ;

    @Override
    public String signInUser(UserRequestSignInDTO userRequestSignInDTO) {
        User user = userRepo.findByEmail(userRequestSignInDTO.getEmail());
        //check whether user send otp and otp that reside in database
        if(userRequestSignInDTO.getOtp().equals(user.getOtp())){
            if(user!=null && bCryptPasswordEncoder.matches(userRequestSignInDTO.getPassword(), user.getSalt()) ){
                String token = jwtUtils.genarateJWT(user);
                userRepo.updateVerifyState(true,userRequestSignInDTO.getUserID());
                return "User login successfully . token = " + token;
            }
        }
        return "user login fail ";
    }

    @Override
    public String signInAdmin(AdminRequestSignInDTO adminRequestSignInDTO) {
        Admin admin = adminRepo.findByEmail(adminRequestSignInDTO.getEmail());
        if(admin!= null && bCryptPasswordEncoder.matches(adminRequestSignInDTO.getPassword(),admin.getSalt())){
            String token = jwtUtils.genarateJWTForAdmin(admin);
            return "Admin login successfully . token = " + token;

        }
        return "Admin login fail ";
    }

}
