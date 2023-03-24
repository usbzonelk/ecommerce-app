package com.example.backend.service;

public interface EmailSenderService {
     void sendEmail(String receiver, String subject , String body );
}
