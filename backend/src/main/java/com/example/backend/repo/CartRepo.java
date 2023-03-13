package com.example.backend.repo;

import com.example.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
@Component
public interface CartRepo extends JpaRepository<Cart,Integer> {
    boolean existsByItemItemID(int itemId);

    boolean existsByUserUserId(int userId);

    Cart  getByUserUserId(int id);
}
