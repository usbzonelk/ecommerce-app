package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.*;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.entity.Item;
import com.example.backend.entity.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.*;
import com.example.backend.service.AdminService;
import com.example.backend.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceIMPL implements AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private PropertyRepo propertyRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RevokeTokenRepo revokeTokenRepo;

    @Override
    public String addItem(ItemAddRequestDTO itemAddRequestDTO) {
        Item item = new Item(
                itemAddRequestDTO.getDescription(),
                itemAddRequestDTO.getUnitPrice(),
                itemAddRequestDTO.getDisPrecentage(),
                itemAddRequestDTO.getDisPrice(),
                itemAddRequestDTO.getAvailability(),
                itemAddRequestDTO.getImages(),
                itemAddRequestDTO.getProcessor(),
                itemAddRequestDTO.getBrand(),
                itemAddRequestDTO.getSsd(),
                itemAddRequestDTO.getRam(),
                itemAddRequestDTO.getScreenSize(),
                itemAddRequestDTO.getQuantity()
        );
        if(!itemRepo.existsById(item.getItemID())){
            itemRepo.save(item);
            return "id = "+item.getItemID()+" item is added ";
        }
        return  "id = "+item.getItemID()+" item is already added ";
    }

    @Override
    public UserResponseDTO getUserUsingID(int id){
        if(userRepo.existsById(id)){
            User user = userRepo.getById(id);
            UserResponseDTO userResponseDTO = new UserResponseDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getContactNumber()
            );
            return userResponseDTO ;
        }else{
            throw new NotFoundException("User is not found id = " + id);
        }
    }

    @Override
    public String deleteUser(int id) {
        if(userRepo.existsById(id)){
            User user = userRepo.getById(id);
            userRepo.deleteById(id);
            return "user name = " + user.getUserName() + " id = " + user.getUserId() + " is delete ";
        }else {
            throw new NotFoundException("User is not found id = "+ id);
        }
    }

    @Override
    public String deleteItem(int id) {
        if(itemRepo.existsById(id)){
            itemRepo.deleteById(id);
            return  "item id = " + id + " is deleted!!";
        }
        throw  new NotFoundException("Item id = "+id+" not in the database !!");
    }

    @Override
    public String updateQty(ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO) {
        if(itemRepo.existsById(itemQTYUpdateRequestDTO.getId())){
            itemRepo.updateItemQTY(itemQTYUpdateRequestDTO.getQuantity() , itemQTYUpdateRequestDTO.getId());
            return "Update item quantity where id = "+ itemQTYUpdateRequestDTO.getId()+" successfully!!";
        }else{
            throw new NotFoundException("Id = "+ itemQTYUpdateRequestDTO.getId() + " not found");
        }


    }

    @Override
    public String resetPass(AdminPasswordResetRequestDTO adminPasswordResetRequestDTO , String authorizationHeader) {
            if (adminRepo.existsById(adminPasswordResetRequestDTO.getId())) {
                Admin admin = adminRepo.getById(adminPasswordResetRequestDTO.getId());
                if (bCryptPasswordEncoder.matches(adminPasswordResetRequestDTO.getCurrentPass(), admin.getSalt())) {
                    String newSalt = bCryptPasswordEncoder.encode(adminPasswordResetRequestDTO.getNewPass());
                    adminRepo.restPassword(newSalt, adminPasswordResetRequestDTO.getId());
                    revokeTokenRepo.insertToken(authorizationHeader);
                    return "password is reset admin id = " + adminPasswordResetRequestDTO.getId();
                } else {
                    return "salt value mismatch !!";
                }
            } else {
                throw new NotFoundException("There is no admin for id = " + adminPasswordResetRequestDTO.getId());
            }
    }

    @Override
    public String resetEmail(int adminID , String newEmail, String oldEmail , String authorizationHeader) {
        if (adminRepo.existsById(adminID)) {
            Admin admin = adminRepo.getById(adminID);
            if (oldEmail.equals(admin.getEmail())) {
                adminRepo.resetEmail( newEmail , adminID);
                revokeTokenRepo.insertToken(authorizationHeader);
                return "email is reset admin id = " + adminID;
            } else {
                return "previous email does not match !!";
            }
        } else {
            throw new NotFoundException("There is no admin for id = " + adminID);
        }
    }

    @Override
    public String updatePrivVal(int ID2 , String adminLevel) {
        if(adminRepo.existsById(ID2)){
            adminRepo.insertPrivVal(adminLevel , ID2);
            return "ID = "+ID2 +" admin's Admin Leval update successfully ";
        }else{
            throw new NotFoundException("ID = "+ID2 + " Admin not found") ;
        }
    }

    @Override
    public String updateProperties(int adminID, String property, String propertyname ) {
        if(propertyRepo.existsByAdminID(adminID)){
            propertyRepo.updateProperty(propertyname,property,adminID);
            return "updated property";
        }else{
            System.out.println("check");
            propertyRepo.insertProperty(adminID,propertyname,property);
            return "inserted property";
        }
    }




}
