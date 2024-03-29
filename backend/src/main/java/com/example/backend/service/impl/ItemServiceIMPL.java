package com.example.backend.service.impl;

import com.example.backend.DTO.ResponseDTO.ItemBrandNameResponseDTO;
import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.DTO.ResponseDTO.ItemResponseDTO;
import com.example.backend.entity.Item;
import com.example.backend.exception.NotFoundException;
import com.example.backend.repo.ItemRepo;
import com.example.backend.service.ItemService;
import com.example.backend.util.mappers.ItemMapper;
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
    public List<ItemDTO> getItemsBySearch(String searchString) {
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
                        i.getScreenSize(),
                        i.getTitle(),
                        i.getQuantity()
                );
                itemDTOS.add(itemDTO);
            }return itemDTOS;
        }else {
           throw new NotFoundException("search query = " +searchString + " is Not Found ");
        }

    }

    @Override
    public List<ItemBrandNameResponseDTO> getAllBrandNames() {
        List<Item> items = itemRepo.getAllBy();
        List<ItemBrandNameResponseDTO> itemNames = new ArrayList<>();
        if (!items.isEmpty()) {
            for (Item i : items) {
                boolean flag = false;
                for (ItemBrandNameResponseDTO c : itemNames) {
                    if (i.getBrand().equals(c.getBrandName())) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    ItemBrandNameResponseDTO itemBrandNameResponseDTO = new ItemBrandNameResponseDTO(
                            i.getBrand()
                    );
                    itemNames.add(itemBrandNameResponseDTO);
                }
            }
        }
        return itemNames;
    }

    @Override
    public ItemDTO getItemByID(int itemID) {
        if(itemRepo.existsById(itemID)){
            Item item = itemRepo.getById(itemID);
            ItemDTO itemDTO = new ItemDTO(
                    item.getDescription(),
                    item.getUnitPrice(),
                    item.getDisPrecentage(),
                    item.getDisPrice(),
                    item.getAvailability(),
                    item.getImages(),
                    item.getProcessor(),
                    item.getBrand(),
                    item.getSsd(),
                    item.getRam(),
                    item.getScreenSize(),
                    item.getTitle(),
                    item.getQuantity()
            );
            return itemDTO;
        }else {
            throw new NotFoundException("Item not found id = "+itemID);
        }
    }

    @Override
    public List<ItemResponseDTO> getAllItems() {
        List<Item> items = itemRepo.getAllBy();
        if(!items.isEmpty()){
            List<ItemResponseDTO> allItems = itemMapper.ItemListToDTOList(items);
            return allItems;
        }else{
            throw  new NotFoundException("NO items in the item table");
        }
    }

    @Override
    public List<ItemResponseDTO> getItemsByPriceRange(double upperPriceBound, double lowerPriceBound) {
        List<Item> items = itemRepo.getItemsBYPriceRange(upperPriceBound,lowerPriceBound);
        if(!items.isEmpty()){
            List<ItemResponseDTO> allItems = itemMapper.ItemListToDTOList(items);
            return allItems;
        }else{
            throw  new NotFoundException("NO items in the item table");
        }
    }

    @Override
    public int getAvailableQty(int itemID) {
        if(itemRepo.existsById(itemID)){
            return itemRepo.getCurrentQty(itemID);
        }else {
            throw new NotFoundException("Item Not found item ID = "+itemID);
        }
    }

}
