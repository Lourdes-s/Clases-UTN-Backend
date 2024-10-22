import express, { response } from  'express';

const app = express()
const PORT = 8000

app.use(express.json())/* esto es un Middleware = un codigo / programa que se ejecuta entre medio de otro programa, este caso entre express.json y post */
/* con esto estoy haciendo que todas las consultas HTTP que se hagan a mi servidor pasen primero por app.use */
/* y express.json() hace que si los headers de la consulta son Content-Type: 'application/json' van a guardar el body como JSON */
app.use(express.urlencoded({extended: true})) /* para poder recibir formularios */

app.get('/ping',  (req, res) => {
    const response ={
        ok: true,  /* Si la respuesta se hizo bien o no */
        status: 200, /* Determinamos como fue resuelta la operacion */
        playload: {
            message: 'pong'
        } /* response.payload / response.data / response.result => objeto con informacion */
    }
    res.status(200).json(response) /* settea el status HTTP del body  */
})  

app.post('/ping', (req, res) =>{
    /* capturar los datos del body, el body esta en la request */
/*     req.body */
    console.log('este es el body', req.body)
    console.log(req.body.nombre)
    const response ={
        ok: true,
        status: 200,
        message: 'consulta realizada con exito',
        playload: {
            message: 'pong'
        }
    }
    res.json(response)
})


/* 
app.post('/register', (req, res) => {
    try{
        if (!req.body.username || !req.body.password) {
            throw {code: 'ERR_INVALID_ARG_TYPE', detail:'el username y password son requeridos'}
        }
        const response = {
            ok: true,
            status: 201,
            playload: {
                message: 'Usuario registrado'
            }
        }
        res.json(response)
    }
    catch(err){
        console.dir(err.code)
        if (err.code == 'ERR_INVALID_ARG_TYPE'){
            console.log('Error: Argumentos invalidos')
        }
        const response = {
            ok: false,
            status: 400,
            playload: {
                message: 'Debes tener un username valido'
            }
        }
        res.json(response)
    }
}) 
*/


app.post('/register', (req, res) => {
    const response = {
        ok: true,
        status: 200,
        message: 'Consulta realizada con exito',
    }
    try {
        if(!req.body.nombre){
            response.ok = false
            response.status = 400
            response.message = 'No ingresaste el nombre'
            res.json(response)
        }
        res.json(response)
    }
    catch(error){
        response.message = 'Internal server error'
        response.payload.detail = error.detail
        response.status = 500
        response.ok = false
        res.json(response)
    }
})



const productos = [
    {
        id: 1,
        nombre: 'Pantalon',
        precio: 100,
        imagen: 'https://picsum.photos/id/237/200/300',
        descripcion: 'Pantalon deportivo',
        stock: 10
    },
    {
        id: 2,
        nombre: 'Camisa',
        precio: 50,
        imagen: 'https://picsum.photos/id/238/200/300',
        descripcion: 'Camisa deportiva',
        stock: 5
    },
    {
        id: 3,
        nombre: 'Zapatos',
        precio: 200,
        imagen: 'https://picsum.photos/id/239/200/300',
        descripcion: 'Zapatos deportivos',
        stock: 20
    }
]

/* ------------------------------ PARAMETROS DE BUSQUEDA ------------------------------ */

/* Esta ruta tiene un parametro de busqueda llamado producto_id */
app.get('/productos/:producto_id', (req, res) => {
    /* todos los parametros de busqueda que yo tengo en mi ruta se van a guardar en req.params, este es un  objeto */
    /* los valores de mi req.params siempre es string */
    /* si yo tengo: api/cart/:user_id/:cart_id se guardara en req.params como {user_id: 'valor', cart_id: 'valor'} */
    const {producto_id} = req.params
    //TODO verificar que venga un producto_id
    const producto_buscado = productos.find((producto) => producto.id === Number(producto_id))
    if(!producto_buscado){
        //responder 404
    }
    const response  = {
        ok: true,
        status: 200,
        playload: {
            message:  'Lista de productos',
            producto: producto_buscado
        }
    }
    res.json(response)
})


/* ------------------------------ PARAMETROS DE CONSULTA ------------------------------ */


app.get('/productos', (req, res) => {
    /* los query params se  guardan en req.query */
    const {min_price, max_price} = req.query
    const productos_buscados =  productos.filter((producto) => producto.precio > min_price && producto.precio  < max_price)

    const response  = {
        ok: true,
        status: 200,
        playload: {
            message:  'Lista de productos',
            productos: productos_buscados
        }
    }
    res.json(response)
})



app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en http://localhost:${PORT}`)
})