
/*-----------------------------FETCH y ASYNC-----------------------------*/

/* Fetch es una funcion nativa, es decir viene incluida en el lenguaje, no es necesario crearlo, fetch nos permite emitr consultas http (Hypertext Transfer Protocol), estamos transfiriendo HTML, CSS, JS, etc. de un servidor a nuestro navegador 

COMO HACER LA CONSULTA HTTP:
le voy a indicar a fetch la direccion a la que voy a consultar (en este caso vamos a usar una API falsa https://swapi.dev)
para consumir la api yo tengo que hacer:
fetch('https://swapi.dev/api/people/1') -> esto me va a traer a la primer persona (Luke Skywalker)
fetch a su vez recibe 2 parametros, el primero es la direccion a la que vamos a emitir la consulta http y el segundo parametro es la configuracion que es un objeto para esa configuracion puede ser el metodo con el que vamos a consumir la API, por ejemplo GET. Esto me va a traer una respuesta con un JSON
*/

/* El valor de retorno de fetch son las promesas, que son un tipo de dato especial que sea creo para trabajar con asincronia, porque fetch es asincronico, es decir que no se va a resolver en la sincronicidad que nosotros conocemos 
si nosotros hacemos:

const respuesta = await fetch('https://swapi.dev/api/people/1', {
    method: 'GET'
})
console.log(respuesta)

nos va a retornar un promise pending, debido a que el console.log() no va a esperar que el fetch se termine de resolver (sabiendo que este tarda mas en resolverse) porque fetch es asincronico y el console.log() sincronico, entonces
*/

/* 
Las promesas tienen los siguientes estados:

-Pending => indica que dicha promesa aun esta pendiente de resolucion
-Resolved => la promesa fue rusuelta
-Rejected => la promesa fue rechazada o hubo un fallo al resolverse
*/

/* Entonces para evitar que me retorne el pending vamos a trabajar con ASYNC y AWAIT Y para esto vamos a tener que hacer funciones por ejemplo:

const obtenerAnakin = async () => {
    const respuesta = await fetch('https://swapi.dev/api/people/1', {
        method: 'GET'
    })
    console.log(respuesta)

Entonces de este modo estamos diciendo que el console.log se va a ejecutar luego de que el console.log se resuelva 
La ventaja de ttrabajar con asincronia es que si tengo dos funciones ambas se ejecutan al mismo tiempo y se va a mostrar primero la que se resuelva primero
*/

/* por ejemplo si yo hago: */

/* const obtenerAnakin = async () => {
    const respuesta = await fetch('https://swapi.dev/api/people/1', {
        method: 'GET'
    })
    const data = await respuesta.json()
    return data
} */

/* estoy obteniendo un json, pero tambien puedo usarlo para obtener imagenes o videos */

/* El metodo de unaa consulta http generalmente determina que tipo de consulta vas a hacer, obtener datos, enviar datos, actualizar datos , eliminar datos.
El tipo de metodo get lo que va a determinar es qur yo quiero obtener algo */



/*-----------------------------CALLBACKS-----------------------------*/


/* Callback es una funcion pasada por parametro */

/* 
ejemplo:
yo tengo una lista de usuarios 
*/

const usuarios = [
    {
        nombre: 'Pepe',
        edad: 30
    },
    {
        nombre: 'Maria',
        edad: 49
    },
    {
        nombre: 'Jose',
        edad: 56
    },
]

/* y quiero que por cada nombre salga una alerta que diga 'hola' y el nombre y para esto vamos a usar el metodo avanzado for each, que es un metodo avanzado de arrays, es decir que este metodo pertenece al prototipo de los arrays. Recordando que JS es un lenguaje basado en prototipos, es decir que cada tipo de dato es un prototipo propio, los arrays pertenecen al prototipo de los arrays y estos tienen metodos disponibles dependiendo del prototipo con el que trabajemos, como el filter, find, join, push, etc.    */

/* decimos que for each es un metodo avanzado porque recibe una funcion por parametro, las funciones que reciben funciones por parametro son llamadas de alto orden (Higher-order function), por esto for each le decimos metodo avanzado y a push metodo de arrays*/

/* for each recibe una funcion por parametro, que en este caso va a ser de forma anonima, pero puede nor serlo.
una funcion anonima se hace asi: () => {
    
}
y le decimos anonima porque no tiene nombre y no la estoy guardando en ningun lugar, pero no todas las callbacks son funciones anonimas
*/

/* For each recibe una funcion, la cual invocara por detras */

/* usuarios.forEach((usuario, indice, listaDeUsuarios) =>{
    console.log('hola ' + usuario.nombre)
}) */ 

/* en este caso foreach recibe una accion y la va a ejecutar por cada elemento y la accion que va a ejecutar es la que yo diga.
la accion que estamos creando va a recibir 3 parametros, el elemento(nombre con la edad), el indice (posicion en el array), lista completa(todo el array) de hecho el indice y la lista completa casi nunca se usa y el acceso a estos datos es posicional*/


/* EJEMPLO DE FILTER PROPIO */

const filterPro = (array, accionCallbackFn) => {
    const resultado = []

    for(const elemento of array){
        if(accionCallbackFn(elemento)){
            resultado.push(elemento)
        }
    }

    return resultado
}

const resultado = filterPro(usuarios, (usuario) =>{
    return usuario.edad > 35
})

console.log(resultado)

/* Pongo como resultado un aaray vacio porque el filter siempre retorna un array */

/* conclusion una callback es el concepto de pasar una funcion por parametro y que hay funciones que reciben callbacks */