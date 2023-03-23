package com.example.backend.service;

public interface LogOutService {
    String logOutUser(String authenticationHeader);

    String logOutAdmin(String authenticationHeader);
}
