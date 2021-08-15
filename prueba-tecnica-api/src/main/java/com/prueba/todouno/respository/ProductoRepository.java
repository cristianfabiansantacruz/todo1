package com.prueba.todouno.respository;

import com.prueba.todouno.entity.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
    ProductoEntity findByCodigoProducto(String codigo);
}
