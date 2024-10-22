CREATE TABLE productos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    descripcion VARCHAR (255) NOT NULL,
    precio FLOAT NOT NULL,
    stock INT NOT NULL,  
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    activo BOOLEAN DEFAULT TRUE
)
