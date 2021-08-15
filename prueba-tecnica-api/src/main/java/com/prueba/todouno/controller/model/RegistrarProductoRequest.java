package com.prueba.todouno.controller.model;

import lombok.Data;
import org.hibernate.annotations.BatchSize;

@Data
public class RegistrarProductoRequest {
    private String nombre;
    private String detalle;
    private Integer stock;
    private Double precio;
    private String codigoProducto;
}
