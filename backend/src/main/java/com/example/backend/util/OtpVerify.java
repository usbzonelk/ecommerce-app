package com.example.backend.util;

public interface OtpVerify {
    boolean verificationUserOTP(int userID);

    boolean verificationAdminOTP( int adminID);
}
