package com.example.backend.util.impl;
import org.springframework.stereotype.Service;

import java.util.Random;
@Service
public class Otp implements com.example.backend.util.Otp {
    public  String genarateOTP(){
        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000;
        String randomValue = String.valueOf(randomNumber);
        return randomValue;
    }
}
