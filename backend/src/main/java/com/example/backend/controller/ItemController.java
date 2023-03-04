package com.example.backend.controller;

import com.example.backend.DTO.ResponseDTO.ItemDTO;
import com.example.backend.entity.Item;
import com.example.backend.service.ItemService;
import com.example.backend.service.UserService;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/item")
public class ItemController {
    @Autowired
    private ItemService itemService;
    @GetMapping(path = "/search/{searchString}")
    public ResponseEntity<StandardResponse> getItemsBySearch(@PathVariable(value = "searchString") String searchString){
        List<ItemDTO> items = itemService.getItemsBySearch(searchString);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "This is the items search name = " + searchString,
                                 items
                        ), HttpStatus.OK);
    }
}




