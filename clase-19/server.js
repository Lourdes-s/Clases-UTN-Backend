import express from 'express'
import {engine} from 'express-handlebars'

const app = express()
const PORT = 3000

app.use(express.static('./public'))

app.engine('handlebars', engine())

app.set('view engine', 'handlebars')
app.set('views', './views')

//middleware para indicarle a mi backend que cuando reciba consultas que tengan Content-type: 'application/wwww-url-encoded' se transformara en objeto y seran mandadas por el body de mi request 
app.use(express.urlencoded({extended: true}))

const productos = [
    {
        id: 1,
        nombre: 'tv noblex',
        precio: 4000,
        descripcion: 'Una tv que se puede usar para ver canales',
        categorias: ['tecnologia', 'hogar', 'futbol'],
        stock: 4,
        active: true
    },
    {
        id: 2,
        nombre: 'Pc escritorio dell',
        precio: 6000,
        descripcion: 'Una PC cumplidora',
        categorias: ['tecnologia', 'computacion', 'office'],
        stock: 2,
        active: true
    },
    {
        id: 3,
        nombre: 'Laptop MSI',
        precio: 10000,
        descripcion: 'Una laptop apta para todo.',
        categorias: ['tecnologia', 'computacion', 'gaming', 'office'],
        stock: 7,
        active: true
    }
]

app.get('/', (req, res) =>{
    const view_props = {
        layout:'main',
        status: 200,
        ok: true,
        data:{
            title: 'ofertas de la semana',
            products: productos
        },
        helpers:{
        }
    }
    res.render('home', view_props)
})

app.get('/product/detail/:product_id', (req, res) =>{
    const {product_id} = req.params
    const producto_buscado =  productos.find(producto  => producto.id == Number(product_id))
    if(!producto_buscado){
        //logica 404
    }
    const view_props = {
        layout:'main',
        status: 200,
        ok: true,
        data:{
            product: producto_buscado
        },
        helpers:{
        }
    }
    res.render('detail-view', view_props)
})

app.get('/product/new', (req, res) => {
    const campos_state = {
        nombre: {
            valor: '',
            error: null
        },
        descripcion: {
            valor: '',
            error: null
        },
        stock:{
            valor: 0,
            error: null
        },
        precio: {
            valor: 0,
            error: null
        }
    }
    const view_props = {
        layout: 'main',
        status: 400,
        ok: false,
        data:{
            form_state: campos_state
        }
    }

    res.render('new-product-view')
})

app.post('/product/new', (req, res) => {
    const {nombre, descripcion, stock, precio} = req.body
    const campos_state = {
        nombre: {
            valor: nombre,
            error: null
        },
        descripcion: {
            valor: descripcion,
            error: null
        },
        stock:{
            valor: stock,
            error: null
        },
        precio: {
            valor: precio,
            error: null
        }
    }
    //validar que los datos tengan sentido
    if(!nombre){
        campos_state.nombre.error = 'Debes ingresar un nombre'
    }

    const view_props = {
        layout: 'main',
        status: 400,
        ok: false,
        data:{
            form_state: campos_state
        }
    }
    res.render('new-product-view', view_props)
})

app.listen(PORT,  () => {
console.log('el servidor se esta escuchando en http://localhost:'+PORT)
})
