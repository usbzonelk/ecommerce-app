package com.example.backend.controller;

import com.example.backend.DTO.ResponseDTO.ItemBrandNameResponseDTO;
import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.DTO.ResponseDTO.ItemResponseDTO;
import com.example.backend.entity.Item;
import com.example.backend.service.ItemService;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping(path = "api/v1/item")
public class ItemController {
    @Autowired
    private ItemService itemService;
    @GetMapping(
            path = "/search",
            params = "searchString"
    )
    public ResponseEntity<StandardResponse> getItemsBySearch(@Param(value = "searchString") String searchString) throws NotFoundException {
        List<ItemDTO> items = itemService.getItemsBySearch(searchString);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the items search name = " + searchString,
                                 items
                        ), HttpStatus.OK);
    }
    @GetMapping(path = "/get-brands")
    public ResponseEntity<StandardResponse> getBrandNames(){
        List<ItemBrandNameResponseDTO> items = itemService.getAllBrandNames();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the item brands ",
                                items
                        ), HttpStatus.OK);
    }

    @GetMapping(path = "/get-item-byID",
                params = "itemID"
               )
    public ResponseEntity<StandardResponse> getItemByID(@RequestParam(value = "itemID") int itemID){
        ItemDTO item = itemService.getItemByID(itemID);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the item , item id = "+itemID,
                                item
                        ), HttpStatus.OK);
    }


    @GetMapping(path = "/get-allItems")
    public ResponseEntity<StandardResponse> getAllItems(){
        List<ItemResponseDTO> allItems = itemService.getAllItems();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the all Items ",
                                allItems
                        ), HttpStatus.OK);
     }

    @GetMapping(path = "/get-items-pricerange",
                params = {"upperPriceBound","lowerPriceBound"}
                )
    public ResponseEntity<StandardResponse> getItemsByPriceRange(@RequestParam(value = "upperPriceBound") double upperPriceBound ,
                                                                 @RequestParam(value = "lowerPriceBound" )double lowerPriceBound
                                                                 ){
        List<ItemResponseDTO> items = itemService.getItemsByPriceRange(upperPriceBound,lowerPriceBound);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the all Items ",
                                items
                        ), HttpStatus.OK);
    }

    @GetMapping(path = "get-available-QTY/{itemID}")
    ResponseEntity<StandardResponse> getAvailableQty(@PathVariable(value = "itemID") int itemID){
        int qty = itemService.getAvailableQty(itemID);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the available quantity",
                                qty
                        ), HttpStatus.OK);
    }

}




