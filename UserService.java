package com.book.service;

import com.book.model.User;
import com.book.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
     private UserRepository userRepository;


    public void register(User user){
        userRepository.save(user);
    }

//    public boolean authenticate(String emailid, String password) {
//        User user = userRepository.findByEmailAndPassword(emailid, password);
//        return user != null;
//    }
}
