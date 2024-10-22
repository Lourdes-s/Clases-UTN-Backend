CREATE TABLE orden_productos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    orden_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 0 NOT NULL,
    precio_unitario FLOAT (10,2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (cantidad) REFERENCES carrito_productos(cantidad) ON DELETE CASCADE,
    FOREIGN KEY (precio_unitario) REFERENCES productos(precio) ON DELETE CASCADE
)