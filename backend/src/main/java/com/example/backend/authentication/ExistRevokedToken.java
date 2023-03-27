package com.example.backend.authentication;


public interface ExistRevokedToken {
    boolean checkToken(String token,int id);
}
