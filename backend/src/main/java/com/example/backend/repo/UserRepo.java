package com.example.backend.repo;

import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@EnableJpaRepositories
@Repository
@Transactional
public interface UserRepo extends JpaRepository<User, Integer> {
    @Query(value = "select salt from user",nativeQuery = true)
    List<String> getAllCustomerSalts();
    boolean existsByEmail(String email);
    User findByEmail(String email);

    @Modifying
    @Query(value = "update user set salt = ?1 where user_id = ?2",nativeQuery = true)
    void restPassword(String salt, int id);

    @Query(value = "select verify_state from user where user_id=?1", nativeQuery = true)
    int getVerifiedState(int userId);

    User getByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "update user set verify_state = ?1 where user_id = ?2", nativeQuery = true)
    int updateVerifyState(int var , int userID);

    @Transactional
    @Modifying
    @Query(value = "update user set email = ?1 where user_id = ?2",nativeQuery = true)
    void resetEmail( String newEmail ,int adminID );

    @Transactional
    @Modifying
    @Query(value = "update user set address = ?1 where user_id = ?2",nativeQuery = true)
    void resetAddress(String newAddress, int userID);

    @Query(value = "select user_id from user where email=?1", nativeQuery = true)
    int getUserID(String userEmail);

}
