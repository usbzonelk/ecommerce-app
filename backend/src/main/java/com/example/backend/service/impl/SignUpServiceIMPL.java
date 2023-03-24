package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.User;
import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.EmailSenderService;
import com.example.backend.service.SignUpService;
import com.example.backend.util.impl.Otp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SignUpServiceIMPL implements SignUpService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder ;

    @Autowired
    private EmailSenderService emailSenderService ;

    @Autowired
    private com.example.backend.util.Otp otp;

    @Override
    public String regUser(UserRegRequestDTO userRegRequestDTO) {
        String msg ;
        String OTP = otp.genarateOTP();
        String encrptedPassword = bCryptPasswordEncoder.encode(userRegRequestDTO.getPassword());
        User user = new User(
                userRegRequestDTO.getUserName(),
                userRegRequestDTO.getEmail(),
                userRegRequestDTO.getContactNumber(),
                true,
                encrptedPassword,
                userRegRequestDTO.getAddress(),
                OTP
        );

        if(userRepo.existsByEmail(userRegRequestDTO.getEmail())){
            List<String> salts = userRepo.getAllCustomerSalts();
            for (String s : salts) {
                if (bCryptPasswordEncoder.matches(userRegRequestDTO.getPassword(), s)) {
                    msg = "user name = " + userRegRequestDTO.getUserName() + " already sign up ! please sign in ";
                    return msg ;
                }
            }return "password = "+user.getUserName()+" is already exist please enter different email !! ";
        }
        userRepo.save(user);
        msg = "user name = " + userRegRequestDTO.getUserName() + " is sign up successfully"+ "user id = "+ userRepo.getByEmail(userRegRequestDTO.getEmail()).getUserId() ;
        //send email
        emailSenderService.sendEmail(userRegRequestDTO.getEmail(),"OTP verification ","Your OTP is : "+otp+" . Use this OTP to SignIN");
        return msg ;
    }

    @Override
    public String addAdmin(AdminRegRequestDTO adminRegRequestDTO) {
        String encryptedPass = bCryptPasswordEncoder.encode(adminRegRequestDTO.getPassword());
        Admin admin = new Admin(
                adminRegRequestDTO.getAdminName(),
                adminRegRequestDTO.getEmail(),
                adminRegRequestDTO.getContactNumber(),
                true,
                encryptedPass,
                adminRegRequestDTO.getAddress()
        );
        if(!adminRepo.existsByEmail(admin.getEmail())){
            adminRepo.save(admin);
            return admin.getAdminName()+" is saved " ;
        }else{
            return admin.getAdminName()+" is already registered " ;
        }
    }
}
