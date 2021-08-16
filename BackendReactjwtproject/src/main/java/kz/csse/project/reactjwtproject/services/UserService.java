package kz.csse.project.reactjwtproject.services;

import kz.csse.project.reactjwtproject.entities.Tables;
import kz.csse.project.reactjwtproject.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    Users saveUser(Users user);
    Users getUser(String email);
    Users getUserById(Long id);
    List<Users> getAllUsers();
}
