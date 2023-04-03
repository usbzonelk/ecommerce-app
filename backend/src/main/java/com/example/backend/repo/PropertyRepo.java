package com.example.backend.repo;

import com.example.backend.entity.Properties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@EnableJpaRepositories
@Repository
public interface PropertyRepo extends JpaRepository<Properties , Integer> {
    boolean existsByAdminID(int adminID);
    @Transactional
    @Modifying
    @Query(value = "update properties set property_name = ?1 , property = ?2 where adminid= ?3", nativeQuery = true)
    void updateProperty(String properyName ,String property , int adminID);

    @Transactional
    @Modifying
    @Query(value = "insert into properties (adminID , property ,property_name) values (?1 ,?2 ,?3)", nativeQuery = true)
    int insertProperty(int adminID , String properyName ,String property );
}
