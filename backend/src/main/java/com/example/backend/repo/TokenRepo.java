package com.example.backend.repo;

import com.example.backend.entity.Tokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface TokenRepo extends JpaRepository<Tokens,Integer> {

    @Modifying
    @Query(value = "delete  from token where token = ?1" , nativeQuery = true)
    void deleteToken(String authenticationHeader);


    @Query(value = "select token from token where ID = ?1",nativeQuery = true)
    String getToken(int id);

    @Transactional
    @Modifying
    @Query(value = "insert into token (ID , token ) values (?1 ,?2 )", nativeQuery = true)
    void insertData(int id , String tokens);


    @Modifying
    @Transactional
    @Query(value = "Update token set token= ?1 where ID = ?2 ",nativeQuery = true)
    void updateToken(String token ,int ID);

    @Transactional
    @Modifying
    @Query(value = "delete  from token where ID = ?1" , nativeQuery = true)
    void deleteTokenById(int id);

    @Transactional
    @Modifying
    @Query(value = "delete  from token where token = ?1" , nativeQuery = true)
    void deleteTokenBytoken(String token);
}
