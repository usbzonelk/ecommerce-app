package com.example.backend.repo;

import com.example.backend.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface CheckoutRepo extends JpaRepository<Checkout,Integer> {

    @Query(value = "select * from checkout where user_id = ?1" , nativeQuery = true)
    List<Checkout> getCheckoutByUserID(int userID);

    @Query(value = "select * from checkout" , nativeQuery = true)
    List<Checkout> getAllCheckoutItems();

}
