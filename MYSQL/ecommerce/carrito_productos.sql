CREATE TABLE carrito_productos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    carrito_id INT NOT NULL, 
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 0 NOT NULL,
    fecha_agregado DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (carrito_id) REFERENCES	carritos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
)