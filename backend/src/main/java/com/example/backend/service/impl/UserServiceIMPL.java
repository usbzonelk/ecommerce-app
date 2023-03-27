package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.CartItemDTO;
import com.example.backend.DTO.ResponseDTO.ResponseCheckOutDTO;
import com.example.backend.entity.Admin;
import com.example.backend.entity.Cart;
import com.example.backend.entity.Checkout;
import com.example.backend.entity.User;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.*;
import com.example.backend.service.UserService;
import com.example.backend.util.mappers.CartMapper;
import com.example.backend.util.mappers.CheckOutMapper;
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

    @Autowired
    private CheckoutRepo checkoutRepo ;

    @Autowired
    private CheckOutMapper checkOutMapper ;

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
    public String resetEmail(int userID , String newEmail, String oldEmail , String authorizationHeader) {
        if (userRepo.existsById(userID)) {
            User user = userRepo.getById(userID);
            if (oldEmail.equals(user.getEmail())) {
                userRepo.resetEmail( newEmail , userID);
                revokeTokenRepo.insertToken(authorizationHeader);
                return "email is reset user id = " + userID;
            } else {
                return "previous email does not match !!";
            }
        } else {
            throw new NotFoundException("There is no user for id = " + userID);
        }
    }

    @Override
    public String addToCart(AddToCartRequestDTO addToCartRequestDTO)  {
        Cart cart = cartMapper.DTOToEntity(addToCartRequestDTO);
        List<Cart> allOrders = cartRepo.getAllByUserIsNotNull();
        if(allOrders.isEmpty()){
            cartRepo.save(cart);
            return "data saved . order id = " +cartRepo.getOrderID(addToCartRequestDTO.getUserId(),addToCartRequestDTO.getItemId());
        } else{
            for (Cart c : allOrders) {
                if(c.getUser().getUserId() == addToCartRequestDTO.getUserId() && c.getItem().getItemID() == addToCartRequestDTO.getItemId()){
                    int newQty = c.getQuantity()+cart.getQuantity();
                    cartRepo.updateQTY(newQty,addToCartRequestDTO.getUserId(),addToCartRequestDTO.getItemId());
                    return "data updated . order id = " +cartRepo.getOrderID(addToCartRequestDTO.getUserId(),addToCartRequestDTO.getItemId());
                }
            }
            cartRepo.save(cart);
            return "data saved .order id = " +cartRepo.getOrderID(addToCartRequestDTO.getUserId(),addToCartRequestDTO.getItemId()) ;
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

    @Override
    public String checkout(int userID, int cartID) {
        Cart cart = cartRepo.getById(cartID);
        if(!cart.equals(null)){
            cartRepo.deleteById(cartID);
            double disCount = 1 - (0.01 * cart.getDiscountPercentage());
            double totalPrice = cart.getUnitPrice() * cart.getQuantity()*disCount;
            double disPrice = cart.getUnitPrice()*cart.getQuantity() - totalPrice;
            Checkout checkout = new Checkout(
                cart.getQuantity(),
                cart.getUnitPrice(),
                totalPrice,
                disPrice,
                userID
            );
            checkoutRepo.save(checkout);
            return "Checkout sucessfully";
        }else{
            return "No order for userID = "+userID;
        }

    }

    @Override
    public List<ResponseCheckOutDTO> getAllCheckoutItems(int userID) {
        List<Checkout> orders = checkoutRepo.getCheckoutByUserID(userID);
        if(!orders.isEmpty()){
            List<ResponseCheckOutDTO> allItems = checkOutMapper.checkoutEntityListtoDTOList(orders);
            return allItems;
        }else {
            throw new NotFoundException("No Checkouts for userID = " + userID);
        }
    }
}