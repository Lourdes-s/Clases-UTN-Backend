/*-----------------------------------Tipos de datos con objetos-----------------------------------*/

/* objeto literal es cuando abrimos corchetes y empezamos a escribir propiedades */

/* Cuando yo tengo un objeto para poder tiparlo yo tengo que hacer un objeto de tipado literal, en donde escribo la propiedad y pongo el tipo de dato que va a recibir. estableciendo un contrato de como va a ser la estructura de mi objeto  */

/*
Por ejemplo: 

let producto = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA'
}

let producto_2  = {
    nombre: 'Tv samsung',
    precio: 2000,
    id: 1,
    categoria: 'TECNOLOGIA'
}
*/



class Usuario {
    // TIPADO DE LAS PROPIEDADES DEL USUARIO 
    nombre: string
    role : string
    clave: string
    email : string
    edad : number
    cuit: number
    id: number

    //TIPADO DE LOS PARAMETROS DE LA FUNCION CONSTRUCTORA
    constructor(nombre : string, role : string, clave : string, email : string, edad : number, cuit : number, id : number){
        this.nombre = nombre
        this.role = role
        this.clave = clave
        this.email = email
        this.edad = edad
        this.cuit = cuit
        this.id = id
    }
}

/* const usuario_1 = new Usuario('pepe', 'admin', '123', 'pepe@gmail.com', 72, 222132125)
const usuario_2 = new Usuario('pepe', 'admin', '123', 'pepe@gmail.com', 72, 222132126)  */



/* ahora lo complejizamos un poco mas */


class ManejadorUsuarios {
    usuarios : Usuario[]
    id_counter : number
    constructor(){
        this.usuarios = []
        this.id_counter = 0
    }

    agregarUsuario(nombre : string, role : string, clave :string, email : string, edad: number, cuit : number ){
        const nuevo_usuario : Usuario = new Usuario(nombre, role, clave, email, edad, cuit, this.id_counter++)
        this.usuarios.push(nuevo_usuario)
    }
    eliminarUsuarioPorId(){

    }
    obtenerUsuarios(){

    }
    
}


const manejador_usuarios : ManejadorUsuarios = new ManejadorUsuarios()

manejador_usuarios.agregarUsuario('pepe', 'admin', '123', 'pepe@gmail.com', 53, 213213132)

console.log(manejador_usuarios.usuarios)

/* console.log(usuario_1, usuario_2) */