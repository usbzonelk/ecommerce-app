package com.example.backend.service.impl;

import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.entity.Item;
import com.example.backend.repo.ItemRepo;
import com.example.backend.service.ItemService;
import com.example.backend.util.mappers.ItemMapper;
import javassist.NotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceIMPL implements ItemService {
    @Autowired
    ItemRepo itemRepo ;

    @Autowired
    private ItemMapper itemMapper;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ItemDTO> getItemsBySearch(String searchString) throws NotFoundException {
        List<Item> items = itemRepo.getItemsBySearch(searchString);
        if(items.size()!=0){
            List<ItemDTO> itemDTOS = new ArrayList<>();
            for (Item i : items) {
                ItemDTO itemDTO = new ItemDTO(
                        i.getItemID(),
                        i.getDescription(),
                        i.getUnitPrice(),
                        i.getDisPrecentage(),
                        i.getDisPrice(),
                        i.getAvailability(),
                        i.getImages(),
                        i.getProcessor(),
                        i.getBrand(),
                        i.getSsd(),
                        i.getRam(),
                        i.getScreenSize()
                );
                itemDTOS.add(itemDTO);
            }return itemDTOS;
        }else {
           throw new NotFoundException("search query = " +searchString + " is Not Found ") ;
        }

    }
}