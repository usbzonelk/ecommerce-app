package com.example.backend.controller;
import com.example.backend.DTO.RequestDTO.AdminPasswordResetRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemAddRequestDTO;
import com.example.backend.DTO.RequestDTO.ItemQTYUpdateRequestDTO;
import com.example.backend.DTO.RequestDTO.UserPasswordResetRequestDTO;
import com.example.backend.DTO.ResponseDTO.UserResponseDTO;
import com.example.backend.authentication.Authentication;
import com.example.backend.exception.IntergrityConstraintsViolation;
import com.example.backend.exception.UnauthorizedException;
import com.example.backend.service.AdminService;
import com.example.backend.service.UserService;
import com.example.backend.util.JwtUtils;
import com.example.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/admin")
public class AdminController {
  @Autowired
  private AdminService adminService ;

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserService userService;

  @Autowired
  private Authentication authentication;

  @PutMapping(path = "/add-item")
  public ResponseEntity<StandardResponse> addItems(@RequestBody ItemAddRequestDTO itemAddRequestDTO , @RequestHeader("Authorization") String authorizationHeader) {
      authentication.authentication(authorizationHeader);
      try {
          String text = adminService.addItem(itemAddRequestDTO);
          return new ResponseEntity<StandardResponse>(
                  new StandardResponse
                          (
                                  201,
                                  "Added successfully !!",
                                  text
                          ), HttpStatus.CREATED);

      } catch (RuntimeException e) {
          if (e instanceof RuntimeException) {
              throw new IntergrityConstraintsViolation("");
          } else if (e instanceof UnauthorizedException) {
              throw new UnauthorizedException("");
          }

      }
      return new ResponseEntity<>(
              new StandardResponse(
                      500,
                      "Unexpected error occurred.",
                      ""
              ), HttpStatus.INTERNAL_SERVER_ERROR);
  }

    @GetMapping (path = "/getUserID/{id}")
    public ResponseEntity<StandardResponse> getUserByID(@PathVariable (value = "id") int id , @RequestHeader("Authentication") String authorizationHeader) {
            authentication.authentication(authorizationHeader);
            UserResponseDTO userResponseDTO = adminService.getUserUsingID(id);
            return new ResponseEntity<StandardResponse>(
                    new StandardResponse
                            (
                                    200,
                                    "This is the customer id = " + id,
                                    userResponseDTO
                            ), HttpStatus.OK);

    }
    @DeleteMapping(path = "/delete-user/{id}")
    public ResponseEntity<StandardResponse> removeUSer(@PathVariable(value = "id")int id , @RequestHeader("Authentication") String authenticationHeader){
      authentication.authentication(authenticationHeader);
      String text = adminService.deleteUser(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "customer id = " + id + " deleted!",
                                text
                        ), HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete-item/{id}")
    public ResponseEntity<StandardResponse> removeItem(@PathVariable(value = "id") int id , @RequestHeader("Authentication")String authenticationHeader){
        authentication.authentication(authenticationHeader);
        String text = adminService.deleteItem(id);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "customer id = " + id + " deleted!",
                                text
                        ), HttpStatus.OK);
    }

    @PutMapping(path = "/update-item-qty")
    public ResponseEntity<StandardResponse> updateQty(@RequestBody ItemQTYUpdateRequestDTO itemQTYUpdateRequestDTO, @RequestHeader("Authentication") String authenticationHeader){
        authentication.authentication(authenticationHeader);
        String text = adminService.updateQty(itemQTYUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "item id = " + itemQTYUpdateRequestDTO.getId() + " updated successfully!",
                                text
                        ), HttpStatus.OK);
    }

    @PutMapping(path = "/reset-pass-admin")
    public ResponseEntity<StandardResponse> resetPassword(@RequestBody AdminPasswordResetRequestDTO adminPasswordResetRequestDTO, @RequestHeader(value = "Authentication") String authorizationHeader){
        authentication.authentication(authorizationHeader);
        String text = adminService.resetPass(adminPasswordResetRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse
                        (
                                200,
                                "admin id = " + adminPasswordResetRequestDTO.getId() + "password  update status!",
                                text
                        ), HttpStatus.OK);
    }


}
