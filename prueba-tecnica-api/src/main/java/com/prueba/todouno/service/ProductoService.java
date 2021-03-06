package com.prueba.todouno.service;

import com.prueba.todouno.controller.model.DeleteProductoRequest;
import com.prueba.todouno.controller.model.IngresoSalidaProductoRequest;
import com.prueba.todouno.controller.model.ProductoResponse;
import com.prueba.todouno.controller.model.RegistrarProductoRequest;
import com.prueba.todouno.entity.ProductoEntity;
import com.prueba.todouno.respository.ProductoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Transactional
    public ProductoResponse register(RegistrarProductoRequest registrarProductoRequest) throws Exception {

        if (registrarProductoRequest.getCodigoProducto() == null || registrarProductoRequest.getCodigoProducto().trim().isEmpty()) {
            throw new Exception("El codigo del producto no puede ser nulo o vacio");
        } else {
            ProductoEntity productoEntity = this.productoRepository.findByCodigoProducto(registrarProductoRequest.getCodigoProducto());
            ProductoResponse productoResponse = new ProductoResponse();
            if (productoEntity == null) {
                productoEntity = new ProductoEntity();
                BeanUtils.copyProperties(registrarProductoRequest, productoEntity);
                productoRepository.save(productoEntity);
                BeanUtils.copyProperties(productoEntity, productoResponse);
                return productoResponse;
            }else {
                throw new Exception("El producto ya se encuentra registrado");
            }
        }
    }

    @Transactional
    public ProductoResponse increment(IngresoSalidaProductoRequest ingresoSalidaProductoRequest) throws Exception {
        ProductoEntity productoEntity = this.productoRepository.findByCodigoProducto(ingresoSalidaProductoRequest.getCodigoProducto());
        ProductoResponse productoResponse = new ProductoResponse();

        if (productoEntity == null) {
            throw new Exception("El producto no existe");
        } else if (ingresoSalidaProductoRequest.getCantidadAumentarRestar() <= 0) {
            throw new Exception("El ingreso debe ser mayor a cero");
        } else {
            productoEntity.setStock(ingresoSalidaProductoRequest.getCantidadAumentarRestar() + productoEntity.getStock());
            productoRepository.save(productoEntity);
            BeanUtils.copyProperties(productoEntity, productoResponse);
        }
        return productoResponse;
    }

    @Transactional
    public ProductoResponse decrement(IngresoSalidaProductoRequest ingresoSalidaProductoRequest) throws Exception {
        ProductoEntity productoEntity = this.productoRepository.findByCodigoProducto(ingresoSalidaProductoRequest.getCodigoProducto());
        ProductoResponse productoResponse = new ProductoResponse();

        if (productoEntity == null) {
            throw new Exception("El producto no existe");
        } else if (productoEntity.getStock() <= 0) {
            throw new Exception("No hay unidades disponibles para el producto ");
        } else if (ingresoSalidaProductoRequest.getCantidadAumentarRestar() <= 0) {
            throw new Exception("El valor a disminuir es incorrecto");
        } else if (ingresoSalidaProductoRequest.getCantidadAumentarRestar() > productoEntity.getStock()) {
            throw new Exception("El valor a disminuir es mayor al stock disponible del producto");
        } else {
            productoEntity.setStock(productoEntity.getStock() - ingresoSalidaProductoRequest.getCantidadAumentarRestar());
            productoRepository.save(productoEntity);
            BeanUtils.copyProperties(productoEntity, productoResponse);
        }
        return productoResponse;
    }

    @Transactional
    public HashMap carro(List<IngresoSalidaProductoRequest> ingresoSalidaProductoRequests) throws Exception {
        if(ingresoSalidaProductoRequests == null || ingresoSalidaProductoRequests.isEmpty()){
            throw new Exception("Carro no puede ser vacio");
        }
        final double[] valorTotal = {0.0};
        final String[] errors = {""};
        ingresoSalidaProductoRequests.stream().forEach(x->{
            try {
                ProductoResponse productoResponse = this.decrement(x);
                valorTotal[0] += productoResponse.getPrecio();
            } catch (Exception e) {
                errors[0] += "Cod. Producto: " + x.getCodigoProducto() + " - Error: " + e.getMessage() + "\n";
            }
        });

        HashMap response = new HashMap();
        response.put("msg", "Compra Exitosa \n" +
                "Valor Total Compra: " + valorTotal[0] +
                "\n Productos con error: \n"+ errors[0]);
        response.put("valorTotal", valorTotal[0]);
        response.put("productoerror", errors[0]);
        return response;
    }

    @Transactional
    public ProductoResponse uptade(RegistrarProductoRequest registrarProductoRequest) throws Exception {
        if (registrarProductoRequest.getCodigoProducto() == null || registrarProductoRequest.getCodigoProducto().trim().isEmpty()) {
            throw new Exception("El codigo del producto no puede ser nulo o vacio");
        } else {
            ProductoEntity productoEntity = this.productoRepository.findByCodigoProducto(registrarProductoRequest.getCodigoProducto());
            if (productoEntity == null) {
                throw new Exception("Producto no encontrado");
            } else {
                ProductoResponse productoResponse = new ProductoResponse();
                BeanUtils.copyProperties(registrarProductoRequest, productoEntity);
                productoRepository.save(productoEntity);
                BeanUtils.copyProperties(productoEntity, productoResponse);

                return productoResponse;
            }
        }
    }

    @Transactional
    public ProductoResponse delete(DeleteProductoRequest deleteProductoRequest) throws Exception {
        ProductoEntity productoEntity = this.productoRepository.findByCodigoProducto(deleteProductoRequest.getCodigoProducto());
        if (productoEntity == null) {
            throw new Exception("El producto no existe");
        } else {
            ProductoResponse productoResponse = new ProductoResponse();
            BeanUtils.copyProperties(productoEntity,productoResponse);
            productoRepository.delete(productoEntity);

            return productoResponse;
        }

    }

    @Transactional
    public List<ProductoEntity> listar() {
        return this.productoRepository.findAll();
    }
}