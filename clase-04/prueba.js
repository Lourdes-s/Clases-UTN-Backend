/* ------------------------------------------CLASES------------------------------------------ */

/* 
La clase se usa para crear objetos

Las clases se pueden entender como una especie de plano que va a tener guardado dentro de sí todos los pasos para poder construir un producto.
Entonces si yo quiero crear un producto en mi programa debería hacerlo leyendo el siguiente plano que me va a detallar cómo se ve ese producto específicamente para crear objetos por otro lado el constructor que se encuentra dentro de la clase es una función que se va a ejecutar cuando se cree el producto en conclusión una clase sería como una función que sirve para crear producto o mejor dicho objetos, por otro lado el contructor que se encuentra adentro de la clase es una funcion que se va a ejecutar cuando se cree el producto. en conclusion una clase seria como una funcion que sirve para crear un producto, es decir que cuando se intente crear un producto se va a instanciar la funcion 
*/

/*
para instanciar una clase se va a hacer de igual modo que cuando invocamos una funcion , solo agregamos la palabra new adelante
new Producto()
*/

/* 
class Producto {
    // El constructor es una funcion que se a ejecutar cuando se cree el producto y es aca donde recibe los datos de parametro
    constructor(nombre){
        // This es una autoreferencia al objeto que retornara la clase 
        this.x_valor = 'hola'
        this.precio = precio
        this.nombre = nombre
    }
}

//Instanciar la clase Producto, esto retorna un objeto
let resultado = new Producto('tv Samsung') // al funcionar como una funcion tambien puedo pasar datos como parametro
*/




/* ------------------------------------------METODOS------------------------------------------ */

/* 
Los métodos a diferencia de las propiedades las cuales se crean en cada instancia de objeto es decir que cada vez que crea un nuevo producto se crean las diferentes propiedades como 'x_valor', 'precio', etcétera. Entonces si yo ejecuto new producto 6 veces se guardan la memoria las 6 veces una por cada objeto, en cambio el método se guarda una sola vez en mi memoria y se usa solo para las clases que lo contengan en el caso 'Producto' la diferencia radica principalmente en el rendimiento. 
Teniendo esto en cuenta hay que tener en claro la forma en la que declaramos el método el cual se declara de la siguiente manera:
*/

/* 
presentarProducto () {
        console.log(' Hola, este producto se llama ' + this.nombre)
    }
*/

/* Esta declaración se realiza dentro de la clase de la siguiente manera  */

/* 
class Producto {

    constructor(nombre){
        this.x_valor = 'hola'
        this.precio = 0
        this.nombre = nombre
    }

    presentarProducto(){
        console.log('Hola, este producto se llama ' + this.nombre)
    }
}

let resultado = new Producto('tv Samsung')
resultado.presentarProducto()// por mas de que este el console.log no se va a ejecutar, solo se va a ejecutar si invoco al metodo de esta forma 
*/

/* En cambio si lo hacemos de la siguiente manera  */

/* 
VenderProducto = () =>{
Console.log(‘vendi el producto’ +  this.nombre)
} 
*/

/* Estaría declarando una propiedad por el uso del operador de asignación ya que cuando yo pongo la asignación se crea como una propiedad */ 



/* Ademas se puede crear mas de 1 metodo y estos tambien pueden recibir datos por parametro */

/* 
class Producto {
    constructor(nombre, precio){
        console.log(nombre, precio)
        this.x_valor = 'hola'
        this.precio = precio
        this.nombre = nombre
    }
    presentarProducto(cliente){
        console.log('Hola ' + cliente + ', este producto se llama ' + this.nombre)
    }
    comprar(cantidad){
        console.log('Comprar a ' + this.nombre + ' ' + cantidad + ' veces costara $' + (cantidad * this.precio))
    }
}

let resultado = new Producto('tv LG', 800)
const samsung = new Producto('s20', 1200)

resultado.presentarProducto('pepe')
resultado.comprar(10)
samsung.comprar(10)
*/




/* ------------------------------------------FUNCION CONSTRUCTORA DE ES5 (YA NO SE USA)------------------------------------------ */

/* 
function Item () {
    this.nombre = 'x item'
    Item.prototype.presentar = function(){
        console.log('Este producto se llama ' + this.nombre)
    }
}


let item_1 = new Item()

console.log(item_1)

item_1.presentar() 
*/