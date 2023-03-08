package com.example.backend.service.impl;
import com.example.backend.DTO.RequestDTO.AdminRegRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.entity.Item;
import com.example.backend.repo.AdminRepo;
import com.example.backend.repo.ItemRepo;
import com.example.backend.service.AdminService;
import com.example.backend.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceIMPL implements AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ItemRepo itemRepo;

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
                itemAddRequestDTO.getScreenSize()
        );
        if(!itemRepo.existsById(item.getItemID())){
            itemRepo.save(item);
            return "id = "+item.getItemID()+" item is added ";
        }
        return  "id = "+item.getItemID()+" item is already added ";
    }
}
