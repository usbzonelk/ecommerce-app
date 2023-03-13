package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.entity.Cart;
import com.example.backend.entity.User;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.CartRepo;
import com.example.backend.repo.ItemRepo;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import com.example.backend.util.mappers.CartMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;

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

    @Override
    public String resetPass(UserPasswordResetRequestDTO userPasswordResetRequestDTO) {
        if (userRepo.existsById(userPasswordResetRequestDTO.getId())) {
            User user = userRepo.getById(userPasswordResetRequestDTO.getId());
            if (bCryptPasswordEncoder.matches(userPasswordResetRequestDTO.getCurrentPass(), user.getSalt())) {
                String newSalt = bCryptPasswordEncoder.encode(userPasswordResetRequestDTO.getNewPass());
                userRepo.restPassword(newSalt, userPasswordResetRequestDTO.getId());
                return "password is reset user id = " + userPasswordResetRequestDTO.getId();
            } else {
                return "salt value mismatch !!";
            }
        } else {
            throw new NotFoundException("There is no user for id = " + userPasswordResetRequestDTO.getId());
        }
    }

    @Override
    public String addToCart(AddToCartRequestDTO addToCartRequestDTO) throws SQLIntegrityConstraintViolationException  {
            System.out.println(addToCartRequestDTO.getDiscountPercentage());
            Cart cart = cartMapper.DTOToEntity(addToCartRequestDTO);
            System.out.println(addToCartRequestDTO.getDiscountPercentage());
        if (cartRepo.existsByUserUserId(addToCartRequestDTO.getUserId())) {
                    if (cartRepo.existsByItemItemID(addToCartRequestDTO.getItemId())) {
                        //update quantity existing row
                        Cart cart1 = cartRepo.getByUserUserId(addToCartRequestDTO.getUserId());
                        cart1.setQuantity(cart1.getQuantity() + addToCartRequestDTO.getQuantity());
                        cartRepo.save(cart1);
                        return "quantity updated";
                    }
                }else {
                    //insert new row
                    System.out.println(cart.getDiscountPercentage());
                    cartRepo.save(cart);
                }
        return "added to the cart!!";
    }
}