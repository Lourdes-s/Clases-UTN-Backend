CREATE TABLE ordenes(
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    total FLOAT (10,2) NOT NULL,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    estado INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
)

