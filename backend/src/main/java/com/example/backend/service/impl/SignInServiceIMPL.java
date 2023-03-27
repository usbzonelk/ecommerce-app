package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.AdminRequestSignInDTO;
import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.Tokens;
import com.example.backend.entity.User;
import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.TokenRepo;
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

    @Autowired
    private TokenRepo tokenRepo ;

    @Override
    public String signInUser(UserRequestSignInDTO userRequestSignInDTO) {
        User user = userRepo.findByEmail(userRequestSignInDTO.getEmail());
        //check whether user send otp and otp that reside in database
            if(user!=null && bCryptPasswordEncoder.matches(userRequestSignInDTO.getPassword(), user.getSalt()) ){
                String token = jwtUtils.genarateJWT(user);
                userRepo.updateVerifyState(1,userRequestSignInDTO.getUserID());
                if(tokenRepo.getToken(userRequestSignInDTO.getUserID()) == null){
                    tokenRepo.insertData(userRequestSignInDTO.getUserID(),"Bearer "+token);
                }else{
                    tokenRepo.updateToken("Bearer "+token ,userRequestSignInDTO.getUserID());
                }
                return "User login successfully . token = " + token;
            }else{
                return "user login fail ";
            }
    }

    @Override
    public String signInAdmin(AdminRequestSignInDTO adminRequestSignInDTO) {
        Admin admin = adminRepo.findByEmail(adminRequestSignInDTO.getEmail());
        if(admin!= null && bCryptPasswordEncoder.matches(adminRequestSignInDTO.getPassword(),admin.getSalt())){
            String token = jwtUtils.genarateJWTForAdmin(admin);
            adminRepo.updateVerifyState(1,adminRequestSignInDTO.getAdminID());
            if(tokenRepo.getToken(adminRequestSignInDTO.getAdminID()) == null){
                tokenRepo.insertData(adminRequestSignInDTO.getAdminID(),"Bearer "+token);
            }else{
                tokenRepo.updateToken("Bearer "+token ,adminRequestSignInDTO.getAdminID());
            }
            return "Admin login successfully . token = " + token;
        }else{
            return "Admin login fail ";
        }
    }

}
