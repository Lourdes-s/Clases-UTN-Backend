let nombre : string = 'pepe'

/*-----------------------------------Tipos de datos con variables-----------------------------------*/

/* 1 tipo de dato */

/*
let nombre : string = 'pepe'

nombre = '1' 
*/ 

/* 2 tipos de datos */

/* let nombre : string | null  = null */

/* agregar muchos tipos de datos perderia el sentido de utilizar typescript */





/*-----------------------------------Tipos de datos con funciones-----------------------------------*/

/* le pongo el tipo en el parametro y en el retorno */

/* 
const calcularIva = (precio: number) : number => {
    return precio * 0.21
} 
*/



/* si no tiene retorno es de buena practica poner que retorna void (vacio) */

/* 
const saludar = (nombre: string) : void => {
    console.log('hola ' + nombre)
}
*/



/* puedo hacer tambien que uno de los valores del parametro sea opcional usando el '?' (en este caso el orden es fundamental, asi que siempre poner los opcionales al final) */

/* const mandarEmail = (to : string, message: string, subject?: string) : void=> {
    -FIU FIU se mando el email con magia negra-
    console.log(to, message)
}

mandarEmail('pepito189@gmail.com', 'hola, soy yo, pepe') */



/* Puedo agregar un valor por defecto (si no completo la opcion se manda el valor por defecto)*/

/* const mandarEmail = (to : string, message: string = 'nada', subject: string) : void=> {
    -FIU FIU se mando el email con magia negra-
    console.log(to, message)
}

mandarEmail('pepito189@gmail.com', 'hola, soy yo, pepe') */