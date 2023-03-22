package com.example.backend.repo;

import com.example.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;

@EnableJpaRepositories
@Repository
@Component
public interface CartRepo extends JpaRepository<Cart,Integer> {
    boolean existsByItemItemID(int itemId);

    boolean existsByUserUserId(int userId);

    @Modifying
    @Query(value = "delete  from cart where user_id = ?1" , nativeQuery = true)
    void deleteAllOrders(int userId);

    @Modifying
    @Transactional
    @Query(value = "Update cart set quantity= ?1 where user_id = ?2 and item_id = ?3",nativeQuery = true)
    int updateQTY(int newQty , int userID , int itemId);

    List<Cart> getAllByUserIsNotNull();
}
