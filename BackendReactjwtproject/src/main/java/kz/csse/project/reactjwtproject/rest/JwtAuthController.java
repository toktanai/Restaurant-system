package kz.csse.project.reactjwtproject.rest;

import kz.csse.project.reactjwtproject.entities.Roles;
import kz.csse.project.reactjwtproject.entities.Users;
import kz.csse.project.reactjwtproject.jwt.JwtTokenGenerator;
import kz.csse.project.reactjwtproject.models.JwtRequest;
import kz.csse.project.reactjwtproject.models.JwtResponse;
import kz.csse.project.reactjwtproject.models.UserRolesDTO;
import kz.csse.project.reactjwtproject.services.RolesService;
import kz.csse.project.reactjwtproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class JwtAuthController {
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;
    @Autowired
    private RolesService rolesService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(value = "/addUser")
    public ResponseEntity<?> addUser(@RequestBody UserRolesDTO user){
        Users newUser = new Users();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setFullName(user.getFullName());

        Long id = Long.valueOf(1);
        if(user.getRoleId() == 2){
            id = Long.valueOf(2);
        }
        if(user.getRoleId() == 3){
            id = Long.valueOf(3);
        }
        List<Roles> roles = new ArrayList<Roles>();
        Roles role =  rolesService.getRole(id);
        roles.add(role);
        newUser.setRoles(roles);
        userService.saveUser(newUser);
        return ResponseEntity.ok(newUser);
    }

    @RequestMapping(value = "/auth")
    public ResponseEntity<?> auth(@RequestBody JwtRequest request) throws Exception{

        authenticate(request.getEmail(), request.getPassword());
        final UserDetails userDetails =
                userService.loadUserByUsername(request.getEmail());

        final String token = jwtTokenGenerator.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));

    }

    public void authenticate(String email, String password) throws Exception{

        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        }catch (DisabledException e){
            throw new Exception("USER_DISABLED", e);
        }catch (BadCredentialsException e){
            throw new Exception("INVALID_CREDENTIALS", e);
        }

    }

}
