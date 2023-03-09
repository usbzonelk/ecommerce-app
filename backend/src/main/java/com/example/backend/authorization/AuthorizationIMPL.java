package com.example.backend.authorization;

import com.example.backend.exception.JWTExpireException;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.util.JwtUtils;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class AuthorizationIMPL implements Authorization {
    @Autowired
    private JwtUtils jwtUtils;
    public void authorization(String authorizationHeader){
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String token = authorizationHeader.substring(7);
                JwtParser jwtParser = Jwts.parser().setSigningKey(jwtUtils.secret);
                Jws<Claims> jws = jwtParser.parseClaimsJws(token);
                Claims claims = jws.getBody();
                Date expiration = claims.getExpiration();
                expiration.before(new Date());

            }catch (MalformedJwtException e) {
                throw new UnauthorizedException("Unauthorized access!!");
            }catch (ExpiredJwtException e){
                ExpiredJwtException ex = (ExpiredJwtException) e;
                throw new JWTExpireException(ex.getHeader(), ex.getClaims(), "Token expired");
            }
        }
    }
}
