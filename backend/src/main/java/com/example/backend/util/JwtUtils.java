package com.example.backend.util;

import com.example.backend.DTO.RequestDTO.UserRequestSignInDTO;
import com.example.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static String secret = "static varible";
    private static long expiryDuration= 60 * 60;
    public String genarateJWT(User user){
        //claims
        long militime = System.currentTimeMillis();
        long expiryTime=militime + expiryDuration * 1000;
        Date issueAt = new Date(militime);
        Date expiryAt = new Date(expiryTime);
        Claims claims = Jwts.claims().setIssuer(user.getPassword())
                .setIssuedAt(issueAt)
                .setExpiration(expiryAt);

        //optional claims
        claims.put( "type",user.getUserType);
        claims.put("email",user.getEmail());
        claims.put("password",user.getPassword());

        // genarate jwt using claims
        return Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();

    }
}