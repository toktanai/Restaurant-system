package kz.csse.project.reactjwtproject.services.impl;

import kz.csse.project.reactjwtproject.entities.Users;
import kz.csse.project.reactjwtproject.repositories.UserRepository;
import kz.csse.project.reactjwtproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users getUser(String email) {
        Users user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public Users getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(s);
        if(user!=null){
            return user;
        }else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }
}
