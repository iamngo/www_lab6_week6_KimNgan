package vn.edu.iuh.fit.controlllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.models.User;
import vn.edu.iuh.fit.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    public List<User> findAllUser(){
       return userService.findAllUser();
    }

    @GetMapping("/by-email/{email}")
    public User findByEmail(@PathVariable("email") String email){
        return userService.findByEmail(email).orElse(null);
    }
}
