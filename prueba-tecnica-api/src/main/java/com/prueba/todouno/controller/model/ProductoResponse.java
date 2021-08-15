package com.prueba.todouno.controller.model;

import lombok.Data;

@Data
public class ProductoResponse {
    private String nombre;
    private String detalle;
    private Integer stock;
    private Double precio;
    private String codigoProducto;
}
