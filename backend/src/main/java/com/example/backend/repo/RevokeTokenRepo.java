package com.example.backend.repo;

import com.example.backend.entity.RevokedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@EnableJpaRepositories
@Repository
public interface RevokeTokenRepo extends JpaRepository<RevokedToken, Integer>{
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO revoke_token (token) VALUES (?1);" , nativeQuery = true)
    void insertToken(String token);

    @Query(value = "select * from revoke_token where  token = ?1 ;" , nativeQuery = true)
    RevokedToken getToken(String token);
}

