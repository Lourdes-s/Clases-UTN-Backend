CREATE TABLE usuarios(
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATE DEFAULT CURRENT_DATE
    )

/* -----------------------CREAR USUARIO ----------------------- */

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('pepe', 'pepe@gmail.com', 'pepesito123')

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('andrea', 'patitos222@gmail.com', 'andreita123')

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('margarita', 'margarett@gmail.com', 'marga123')

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('Barbie', 'esteticapretty@gmail.com', 'Barbarita123')


/* -----------------------BUSCAR USUARIO POR ID ----------------------- */

SELECT * FROM usuarios WHERE usuario_id = 1

/* -----------------------BUSCAR BUSCAR EL USERNAME Y EL  EMAIL POR ID ----------------------- */

SELECT username, email FROM usuarios WHERE usuario_id = 1

/* -----------------------BUSCAR BUSCAR POR ACTIVO ----------------------- */

SELECT * FROM usuarios WHERE activo = 0

/* -----------------------CAMBIAR PASSWORD POR ID ----------------------- */

UPDATE usuarios  SET password_hash = 'nuevapassword' WHERE usuario_id = 1

/* -----------------------E;IMINAR USUARIO POR ID ----------------------- */

DELETE  FROM usuarios WHERE usuario_id = 4


