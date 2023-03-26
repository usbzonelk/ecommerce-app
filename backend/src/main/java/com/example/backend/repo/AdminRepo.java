package com.example.backend.repo;

import com.example.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@EnableJpaRepositories
@Repository
public interface AdminRepo extends JpaRepository<Admin,Integer> {

    Admin findByEmail(String email);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "update admin set salt = ?1 where admin_id = ?2",nativeQuery = true)
    void restPassword(String salt, int id);

    @Query(value = "select privilage from admin where admin_id = ?1",nativeQuery = true)
    String getPrivilageVal(int adminID);

    @Transactional
    @Modifying
    @Query(value = "update admin set privilage = ?1 where admin_id= ?2", nativeQuery = true)
    void insertPrivVal(String adminLevel , int ID);

    @Query(value = "select verify_state from admin where admin_id=?1", nativeQuery = true)
    int getVerifiedState(int adminID);

    @Transactional
    @Modifying
    @Query(value = "update admin set verify_state = ?1 where admin_id = ?2", nativeQuery = true)
    int updateVerifyState(int var , int adminID);

    Admin getByEmail(String email);
}
