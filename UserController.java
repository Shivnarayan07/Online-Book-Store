package com.book.controller;

import com.book.model.User;
import com.book.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String saveUser(@RequestBody User user){
        userService.register(user);
        return "Account Created Successfully";
    }

//    @PostMapping("/login")
//    public String login(@RequestBody User user) {
//        boolean isAuthenticated = userService.authenticate(user.getEmailId(), user.getPassword());
//        if (isAuthenticated) {
//            return "Login successful";
//        } else {
//            return "Invalid email or password";
//        }
//    }
}
