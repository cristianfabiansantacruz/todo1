package com.prueba.todouno.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name = "users")
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password;
}
