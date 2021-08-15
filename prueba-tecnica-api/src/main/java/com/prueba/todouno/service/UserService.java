package com.prueba.todouno.service;

import com.google.common.hash.Hashing;
import com.prueba.todouno.controller.model.UserRequest;
import com.prueba.todouno.controller.model.UserResponse;
import com.prueba.todouno.entity.UserEntity;
import com.prueba.todouno.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Service
public class UserService {

    @Value("${key.password}")
    private String key;

    @Autowired
    private UserRepository userRepository;

    public UserResponse singUp (UserRequest userRequest){
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userRequest.getUsername());

        String sha256hex = Hashing.sha256()
                .hashString(userRequest.getPassword(), StandardCharsets.UTF_8)
                .toString();

        userEntity.setPassword(sha256hex);
        userRepository.save(userEntity);

        UserResponse userResponse = new UserResponse();
        userResponse.setUsername(userEntity.getUsername());

        return userResponse;
    }

//    public productoResponse update()

}
