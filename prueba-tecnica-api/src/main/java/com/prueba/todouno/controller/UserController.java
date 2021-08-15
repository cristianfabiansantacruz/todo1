package com.prueba.todouno.controller;

import com.prueba.todouno.controller.model.UserRequest;
import com.prueba.todouno.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/users", "/usuarios"})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public String welcome(){
        return "Welcome";
    }

    @PostMapping("/sing-up")
    public ResponseEntity<?> singUp(@RequestBody UserRequest userRequest){

        return  ResponseEntity.ok(userService.singUp(userRequest));
    }
}
