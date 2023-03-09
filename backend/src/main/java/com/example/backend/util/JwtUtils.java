package com.example.backend.util;
import com.example.backend.entity.Admin;
import com.example.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static long expiryDuration= 60 * 60;
    public static String secret = "static variable";
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
        claims.put( "type",user);
        claims.put("email",user);
        claims.put("salt",user.getSalt());

        // genarate jwt using claims
        return Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();

    }

    public String genarateJWTForAdmin(Admin admin){
        //claims
        long militime = System.currentTimeMillis();
        long expiryTime=militime + expiryDuration * 1000;
        Date issueAt = new Date(militime);
        Date expiryAt = new Date(expiryTime);
        Claims claims = Jwts.claims().setIssuer(admin.getPassword())
                .setIssuedAt(issueAt)
                .setExpiration(expiryAt);

        //optional claims
        claims.put( "type",admin);
        claims.put("email",admin);
        claims.put("password",admin.getSalt());

        // genarate jwt using claims
        return Jwts.builder()
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS512,secret)
                .compact();

    }
}
