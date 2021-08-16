package com.prueba.todouno.controller;

import com.prueba.todouno.controller.model.UserRequest;
import com.prueba.todouno.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.POST})
@RequestMapping(value = {"/users", "/usuarios"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sing-up")
    public ResponseEntity<?> singUp(@RequestBody UserRequest userRequest){
        try {
            return  ResponseEntity.ok(userService.singUp(userRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/sing-in")
    public ResponseEntity<?> singIn(@RequestBody UserRequest userRequest){
        try {
            return  ResponseEntity.ok(userService.singIn(userRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }
}