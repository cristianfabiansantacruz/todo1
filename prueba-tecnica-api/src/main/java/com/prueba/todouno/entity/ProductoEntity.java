package com.prueba.todouno.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "producto")
@Data
public class ProductoEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "detalle")
    private String detalle;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "codigoProducto", unique = true)
    private String codigoProducto;
}
