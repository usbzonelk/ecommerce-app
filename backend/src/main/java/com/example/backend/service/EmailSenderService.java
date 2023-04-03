package com.example.backend.service;

import javax.mail.MessagingException;

public interface EmailSenderService {
     void sendEmail(String receiver, String subject , String body ) throws MessagingException;
}
