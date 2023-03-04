package com.example.backend.repo;

import com.example.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@EnableJpaRepositories
@Repository
public interface ItemRepo extends JpaRepository<Item,Integer> {
    @Query(value = "SELECT * FROM item WHERE brand LIKE '%?1%' OR description LIKE '%?1%'" ,nativeQuery=true)
    List<Item> getItemsBySearch(String search);
}

