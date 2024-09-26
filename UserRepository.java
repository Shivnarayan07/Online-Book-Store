package com.book.repository;

import com.book.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
//    User findByEmailAndPassword(String emailid,String password);
}
