package com.prueba.todouno.controller;

import com.prueba.todouno.controller.model.DeleteProductoRequest;
import com.prueba.todouno.controller.model.IngresoSalidaProductoRequest;
import com.prueba.todouno.controller.model.RegistrarProductoRequest;
import com.prueba.todouno.service.JWTService;
import com.prueba.todouno.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?>  registro(
            @RequestBody RegistrarProductoRequest registrarActualizarProductoRequest,
            @RequestHeader Map<String, String> headers) {
        try {
             jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.register(registrarActualizarProductoRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/increment")
    public ResponseEntity<?> incrementar(
            @RequestBody IngresoSalidaProductoRequest ingresoSalidaProductoRequest,
            @RequestHeader Map<String, String> headers){
        try {
            jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.increment(ingresoSalidaProductoRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/decrement")
    public ResponseEntity<?> salida(
            @RequestBody IngresoSalidaProductoRequest ingresoSalidaProductoRequest,
            @RequestHeader Map<String, String> headers){
        try {
            jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.decrement(ingresoSalidaProductoRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/carro-compras")
    private ResponseEntity<?> carro(
            @RequestBody List<IngresoSalidaProductoRequest> ingresoSalidaProductoRequests,
            @RequestHeader Map<String, String> headers){
        try{
            jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.carro(ingresoSalidaProductoRequests));
        }catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(
            @RequestBody RegistrarProductoRequest registrarProductoRequest,
            @RequestHeader Map<String, String> headers){
        try {
            jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.uptade(registrarProductoRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(
            @RequestBody DeleteProductoRequest deleteProductoRequest,
            @RequestHeader Map<String, String> headers){
        try {
            jwtService.tokenValido(headers);
            return ResponseEntity.ok(productoService.delete(deleteProductoRequest));
        } catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listar(@RequestHeader Map<String, String> headers){
        try{
            jwtService.tokenValido(headers);
            return  ResponseEntity.ok(productoService.listar());
        }catch (Exception e) {
            HashMap map = new HashMap();
            map.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }
}