package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.CartItemDTO;
import com.example.backend.entity.Cart;
import com.example.backend.entity.User;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.CartRepo;
import com.example.backend.repo.ItemRepo;
import com.example.backend.repo.RevokeTokenRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.mappers.CartMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceIMPL implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CartRepo cartRepo ;

    @Autowired
    private CartMapper cartMapper ;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RevokeTokenRepo revokeTokenRepo ;

    @Override
    public String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO , String authenticationHeader) {
        if (userRepo.existsById(userPasswordResetRequestDTO.getId())) {
            User user = userRepo.getById(userPasswordResetRequestDTO.getId());
            if (bCryptPasswordEncoder.matches(userPasswordResetRequestDTO.getCurrentPass(), user.getSalt())) {
                String newSalt = bCryptPasswordEncoder.encode(userPasswordResetRequestDTO.getNewPass());
                userRepo.restPassword(newSalt, userPasswordResetRequestDTO.getId());
                revokeTokenRepo.insertToken(authenticationHeader);
                return "password is reset user id = " + userPasswordResetRequestDTO.getId();
            } else {
                return "salt value mismatch !!";
            }
        } else {
            throw new NotFoundException("There is no user for id = " + userPasswordResetRequestDTO.getId());
        }
    }

    @Override
    public String addToCart(AddToCartRequestDTO addToCartRequestDTO)  {
        Cart cart = cartMapper.DTOToEntity(addToCartRequestDTO);
        List<Cart> allOrders = cartRepo.getAllByUserIsNotNull();
        if(allOrders.isEmpty()){
            cartRepo.save(cart);
            return "data saved";
        } else{
            for (Cart c : allOrders) {
                if(c.getUser().getUserId() == addToCartRequestDTO.getUserId() && c.getItem().getItemID() == addToCartRequestDTO.getItemId()){
                    int newQty = c.getQuantity()+cart.getQuantity();
                    cartRepo.updateQTY(newQty,addToCartRequestDTO.getUserId(),addToCartRequestDTO.getItemId());
                    return "data updated";
                }
            }
            cartRepo.save(cart);
            return "data saved";
        }
    }

    @Override
    public String removeItemById(int id) {
        if(cartRepo.existsById(id)){
            cartRepo.deleteById(id);
        }else{
            throw new NotFoundException("item not found id = " + id);
        }
        return "item was deleted id = " + id;
    }

    @Override
    public String removeAllItemById(int id) {
        if(cartRepo.existsByUserUserId(id)){
            cartRepo.deleteAllOrders(id);

        }else {
            throw new NotFoundException("No items add to cart by user id = "+id);
        }
        return "All oredrs delete user id = " + id;
    }

    @Override
    public List<CartItemDTO> getAllCartItems(int id) {
        List<Cart> allCartItems = cartRepo.getAllItems(id);
        List<CartItemDTO> cartItemDTOS = new ArrayList<>();
        if(allCartItems.isEmpty()){
            throw new NotFoundException("item was not added by user , userID = "+id);
        }else{
            for (Cart c: allCartItems ) {
                CartItemDTO cartItemDTO = new CartItemDTO(
                        c.getItem().getItemID(),
                        c.getUnitPrice(),
                        c.getDiscountPercentage(),
                        c.getQuantity()
                );
                cartItemDTOS.add(cartItemDTO);
            }
        }
        return cartItemDTOS;
    }
}