package com.prueba.todouno.service;

import com.google.common.hash.Hashing;
import com.prueba.todouno.controller.model.UserRequest;
import com.prueba.todouno.controller.model.UserResponse;
import com.prueba.todouno.entity.UserEntity;
import com.prueba.todouno.respository.UserRepository;
import io.jsonwebtoken.Claims;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

@Service
public class UserService {

    @Value("${key.password}")
    private String key;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    public UserResponse singUp (UserRequest userRequest) throws Exception {

        userRequest.setUsername(userRequest.getUsername().toLowerCase());
        UserEntity userEntity = this.userRepository.findByUsername(userRequest.getUsername());
        if (userEntity != null){
            throw new Exception("El usuario ya se encuentra registrado");
        }
        userEntity = new UserEntity();
        userEntity.setUsername(userRequest.getUsername());
        userEntity.setPassword(jwtService.encriptarContrasena(userRequest.getPassword()));
        userRepository.save(userEntity);

        UserResponse userResponse = this.singIn(userRequest);

        return userResponse;
    }

    public UserResponse singIn(UserRequest userRequest) throws Exception {
        userRequest.setUsername(userRequest.getUsername().toLowerCase());

        UserEntity userEntity = userRepository.findByUsernameAndPassword(userRequest.getUsername(),
                jwtService.encriptarContrasena(userRequest.getPassword()));

        if(userEntity != null)
        {
            String token = jwtService.createJWT(userEntity.getId().toString(),userEntity.getUsername());
            UserResponse userResponse = new UserResponse();
            userResponse.setUsername(userEntity.getUsername());
            userResponse.setToken(token);
            return userResponse;
        }else {
            throw new Exception("Usuario o contraseña invalida");
        }
    }
}