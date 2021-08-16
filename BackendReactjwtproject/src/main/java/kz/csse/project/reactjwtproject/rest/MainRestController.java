package kz.csse.project.reactjwtproject.rest;

import kz.csse.project.reactjwtproject.entities.*;
import kz.csse.project.reactjwtproject.models.UserDTO;
import kz.csse.project.reactjwtproject.models.UserPassword;
import kz.csse.project.reactjwtproject.services.*;
import kz.csse.project.reactjwtproject.services.impl.TableServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RolesService rolesService;
    @Autowired
    private TableService tableService;

    @Autowired
    private TempOrdersService tempOrdersService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private FoodService foodService;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;


    @PutMapping(value = "/saveUser")
    public ResponseEntity<?>  saveUser(@RequestBody Users user){
        Users users = getUser();
        users.setFullName(user.getFullName());
        userService.saveUser(users);
        return ResponseEntity.ok("Data updated!");
    }
    @PutMapping(value ="/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UserPassword u){
        Users user = getUser();

        if(bCryptPasswordEncoder.matches(u.getPassword(),user.getPassword())){
            user.setPassword(bCryptPasswordEncoder.encode(u.getNewPassword()));
            userService.saveUser(user);
            String message = "Password saved !";
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return ResponseEntity.ok("Wrong old password,please again enter old password!");
    }
    @GetMapping(value = "/getUser/{email}")
    public ResponseEntity<?> getuser(@PathVariable(name = "email") String email){
        Users user = userService.getUser(email);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){
        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(),user.getFullName(), user.getRoles()), HttpStatus.OK);
    }
    @GetMapping(value = "/tables")
    public ResponseEntity<?> getTables() {
        List<Tables> tables = tableService.getAllTables();
        return new ResponseEntity<>(tables,HttpStatus.OK);
    }
    @PutMapping(value = "/saveTable")
    public ResponseEntity<?>  saveTable(@RequestBody Tables tables){
        tableService.saveTable(tables);
        return ResponseEntity.ok("Data updated!");
    }
    @GetMapping(value = "/getTable/{id}")
    public ResponseEntity<?> getTable(@PathVariable(name = "id") Long id) {
        Tables table = tableService.getTable(id);
        return new ResponseEntity<>(table,HttpStatus.OK);
    }
    @GetMapping(value = "/getTableOrder")
    public ResponseEntity<?> getTableOrders() {
        List<TempOrders> tempOrders = tempOrdersService.getAllTempOrders();
        return new ResponseEntity<>(tempOrders,HttpStatus.OK);
    }

    @GetMapping(value = "/allCategories")
    public ResponseEntity<?> allCategories() {
        List<Categories> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @GetMapping(value = "/allFoods")
    public ResponseEntity<?> allFoods() {
        List<Foods> foods = foodService.getAllFoods();
        return new ResponseEntity<>(foods,HttpStatus.OK);
    }
    @GetMapping(value = "/getFood/{id}")
    public ResponseEntity<?> getFood(@PathVariable(name = "id") Long id) {
        Foods foods = foodService.getFood(id);
        return new ResponseEntity<>(foods,HttpStatus.OK);
    }
    @PostMapping(value = "/saveOrder")
    public ResponseEntity<?>  saveOrder(@RequestBody TempOrders order){
        tempOrdersService.saveTempOrders(order);
        return ResponseEntity.ok().build();
    }
    @GetMapping(value = "/searchByFood/{name}")
    public ResponseEntity<?> getFoodBySearch(@PathVariable(name = "name") String name) {
        if(name != null){
            List<Foods> foods = foodService.getAllByNameContaining(name);
            return new ResponseEntity<>(foods,HttpStatus.OK);

        }
        return new ResponseEntity<>("empty",HttpStatus.OK);
    }
        @DeleteMapping(value = "/deleteOrder")
    public ResponseEntity<?>  deleteOrder(@RequestBody TempOrders order){
        tempOrdersService.deleteTempOrders(order);
        return ResponseEntity.ok().build();
    }
    @GetMapping(value = "/getOrder/{id}")
    public ResponseEntity<?>  getOrder(@PathVariable(name = "id") Long id){
        TempOrders tempOrder = tempOrdersService.getTempOrders(id);
        return new ResponseEntity<>(tempOrder,HttpStatus.OK);
    }

    @GetMapping(value = "/getCategory/{id}")
    public ResponseEntity<?>  getCategory(@PathVariable(name = "id") Long id){
        Categories categories = categoryService.getCategory(id);
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }
    @GetMapping(value = "/getUserById/{id}")
    public ResponseEntity<?>  getUserById(@PathVariable(name = "id") Long id){
        Users user = userService.getUserById(id);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }
    @PutMapping(value = "/saveUserRole/{user_id}/{role_id}")
    public ResponseEntity<?>  saveUserRole(@PathVariable(name = "user_id") Long user_id,@PathVariable(name = "role_id") Long role_id){

        Roles role = rolesService.getRole(role_id);
        if(role != null){
            Users user = userService.getUserById(user_id);
            if(user != null) {
                for(Roles roles:user.getRoles() ){
                    roles.setRole(role.getRole());
                    roles.setId(role_id);

                }

                userService.saveUser(user);
                return  new ResponseEntity<>("ok",HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("wrong",HttpStatus.OK);
    }
    @GetMapping(value = "/getRoles")
    public ResponseEntity<?>  getRoles(){
        List<Roles> roles = rolesService.getAllRoles();
        return new ResponseEntity<>(roles,HttpStatus.OK);
    }
    @GetMapping(value = "/getCategoryFood/{id}")
    public ResponseEntity<?>  getCategoryFood(@PathVariable(name = "id") Long id){

        List<Foods> foods = foodService.getAllByCategories(id);
        return new ResponseEntity<>(foods,HttpStatus.OK);
    }
    @PostMapping(value = "/addCategory")
    public ResponseEntity<?>  addCategory(@RequestBody Categories categories){
        categoryService.saveCategory(categories);
        return new ResponseEntity<>("categories",HttpStatus.OK);
    }
    @PostMapping(value = "/addFood")
    public ResponseEntity<?>  addFood(@RequestBody Foods food){
       foodService.saveFood(food);
        return new ResponseEntity<>(food,HttpStatus.OK);
    }
    @PostMapping(value = "/addTable")
    public ResponseEntity<?>  addTable(@RequestBody Tables tables){
        tableService.saveTable(tables);
        return new ResponseEntity<>(tables,HttpStatus.OK);
    }
    @DeleteMapping(value = "/deleteCategory")
    public ResponseEntity<?>  deleteCategory(@RequestBody Categories categories){
        categoryService.deleteCategory(categories);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping(value = "/deleteTempOrder")
    public ResponseEntity<?>  deleteTempOrder(@RequestBody TempOrders orders){
        tempOrdersService.deleteTempOrders(orders);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping(value = "/deleteTable")
    public ResponseEntity<?>  deleteTable(@RequestBody Tables tables){
        tableService.deleteTable(tables);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping(value = "/deleteFood")
    public ResponseEntity<?>  deleteFood(@RequestBody Foods foods){
        foodService.deleteFood(foods);
        return ResponseEntity.ok().build();
    }
    @GetMapping(value = "/getAllUsers")
    public ResponseEntity<?>  getAllUsers(){
        List<Users> users = userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }
}
