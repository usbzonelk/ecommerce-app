package com.example.backend.repo;

import com.example.backend.entity.Item;
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
public interface ItemRepo extends JpaRepository<Item,Integer> {
    @Query(value = "SELECT i FROM Item i WHERE i.brand LIKE CONCAT('%', :search, '%') OR i.description LIKE CONCAT('%', :search, '%')")
    List<Item> getItemsBySearch(String search);

    @Transactional
    @Modifying
    @Query(value = "update item set quantity = ?1 where item_id = ?2",nativeQuery = true)
    void updateItemQTY(int qty , int id);

    List<Item> getAllBy();

    @Query(value = "select * from item where unit_price <= ?1 and unit_price >= ?2 ", nativeQuery = true)
    List<Item> getItemsBYPriceRange(double upperPriceBound, double lowerPriceBound);

    @Query(value = "select quantity from item where item_id=?1", nativeQuery = true)
    int getCurrentQty(int itemID);
}

