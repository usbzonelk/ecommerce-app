package com.example.backend.util.mappers;
import com.example.backend.DTO.RequestDTO.AddToCartRequestDTO;
import com.example.backend.entity.Cart;
import com.example.backend.entity.Item;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring")
public interface CartMapper {

    @Mappings({
            @Mapping(target = "item", source = "itemId"),
            @Mapping(target = "user", source = "userId"),
    })
    Cart DTOToEntity (AddToCartRequestDTO addToCartRequestDTO);

    default Item mapItemId(int itemId) {
        Item item = new Item();
        item.setItemID(itemId);
        return item;
    }

    default User mapUserId(int userId) {
        User user = new User();
        user.setUserId(userId);
        return user;
    }
}
