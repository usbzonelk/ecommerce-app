package com.example.backend.service.impl;

import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.UserRegRequestDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.User;
import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.EmailSenderService;
import com.example.backend.service.SignUpService;
import com.example.backend.util.OtpVerify;
import com.example.backend.util.impl.Otp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
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

    @Autowired
    private OtpVerify otpVerify ;

    @Override
    public String regUser(UserRegRequestDTO userRegRequestDTO) throws MessagingException {
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
        emailSenderService.sendEmail(userRegRequestDTO.getEmail(),"OTP verification ","Your OTP is : "+OTP+" . Use this OTP to SignIN",userRepo.getByEmail(user.getEmail()).getUserId());
        return msg ;
    }

    @Override
    public String addAdmin(AdminRegRequestDTO adminRegRequestDTO) throws MessagingException {
        String OTP = otp.genarateOTP();
        String encryptedPass = bCryptPasswordEncoder.encode(adminRegRequestDTO.getPassword());
        Admin admin = new Admin(
                adminRegRequestDTO.getAdminName(),
                adminRegRequestDTO.getEmail(),
                adminRegRequestDTO.getContactNumber(),
                true,
                encryptedPass,
                adminRegRequestDTO.getAddress(),
                OTP
        );
        if(!adminRepo.existsByEmail(admin.getEmail())){
            adminRepo.save(admin);
            emailSenderService.sendEmail(adminRegRequestDTO.getEmail(),"OTP verification ","Your OTP is : "+OTP+" . Use this OTP to SignIN",adminRepo.getByEmail(admin.getEmail()).getAdminId());
            return admin.getAdminName()+" is saved . admin id = "+adminRepo.getByEmail(adminRegRequestDTO.getEmail()).getAdminId() ;
        }else{
            return admin.getAdminName()+" is already registered " ;
        }
    }

    @Override
    public String userOTPVerfied(int userID, String otp) {
        if(userRepo.getById(userID).getOtp().equals(otp)){
            if(otpVerify.verificationUserOTP(userID)){
                return "user id = "+userID + " verified user please sign in";
            }else {
                userRepo.updateVerifyState(1,userID);
                return "user is successfully verified" ;
            }
        }else {
            return "OTP is not match ";
        }
    }

    @Override
    public String adminOTPVerfied(int adminID, String otp) {
        if(adminRepo.getById(adminID).getOtp().equals(otp)){
            if(otpVerify.verificationAdminOTP(adminID)){
                return "admin id = "+adminID + " verified admin please sign in";
            }else {
                adminRepo.updateVerifyState(1,adminID);
                return "admin is successfully verified" ;
            }
        }else {
            return "OTP is not match ";
        }
    }
}
